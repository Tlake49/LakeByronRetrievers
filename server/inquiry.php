<?php
declare(strict_types=1);

/**
 * Lake Byron Retrievers secure inquiry receiver.
 *
 * Kept as source while the form is unavailable on the public site. When the
 * mail setup is ready, deploy this file to public_html/api/inquiry.php.
 * Secrets stay in the non-public config described in inquiry-config.php.example.
 */

const MAX_BODY_BYTES = 24576;
const MIN_COMPLETION_MS = 2500;
const TURNSTILE_ACTION = 'training_inquiry';

function respond(int $status, string $message): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    echo json_encode(['message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

function audit(string $event, array $context = []): void {
    // Never log inquiry content, email addresses, Turnstile tokens, or secrets.
    error_log('[lbr-inquiry] ' . $event . ' ' . json_encode($context, JSON_UNESCAPED_SLASHES));
}

function reject_bad_request(string $event): never {
    audit($event, ['ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown']);
    respond(400, 'We could not accept that inquiry. Please review the form and try again.');
}

function request_ip(): string {
    // Cloudflare supplies this header after it has processed the visitor. Do not
    // accept X-Forwarded-For, which clients can forge on a direct request.
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : 'unknown';
}

function read_string(mixed $value, int $maxLength, bool $required = false): string {
    if (!is_string($value)) {
        if ($required) reject_bad_request('missing_or_invalid_field');
        return '';
    }
    // Reject line breaks before normalizing spacing so mail headers cannot be
    // extended with user-controlled lines.
    if (str_contains($value, "\r") || str_contains($value, "\n")) reject_bad_request('invalid_field_line_break');
    $value = preg_replace('/[\t ]+/u', ' ', trim($value)) ?? '';
    if (strlen($value) > $maxLength) {
        reject_bad_request('invalid_field_length');
    }
    if ($required && $value === '') reject_bad_request('missing_required_field');
    return $value;
}

function get_object(array $input, string $key): array {
    $value = $input[$key] ?? null;
    if (!is_array($value) || array_is_list($value)) reject_bad_request('invalid_object');
    return $value;
}

function require_allowed(string $value, array $allowed): string {
    if (!in_array($value, $allowed, true)) reject_bad_request('invalid_select_value');
    return $value;
}

function rate_limit_bucket(array $config, string $bucket, string $identifier, int $hourlyLimit, int $dailyLimit): bool {
    $directory = $config['rate_limit_directory'];
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) return false;

    $key = hash_hmac('sha256', $bucket . "\n" . strtolower($identifier), $config['rate_limit_secret']);
    $path = rtrim($directory, '/') . '/' . $key . '.json';
    $handle = fopen($path, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) return false;

    try {
        $raw = stream_get_contents($handle);
        $events = is_string($raw) ? json_decode($raw, true) : [];
        $events = is_array($events) ? array_values(array_filter($events, static fn($time) => is_int($time) && $time >= time() - 86400)) : [];
        $lastHour = array_filter($events, static fn(int $time) => $time >= time() - 3600);
        if (count($events) >= $dailyLimit || count($lastHour) >= $hourlyLimit) return false;
        $events[] = time();
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($events));
        fflush($handle);
        return true;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function rate_limit(array $config, string $ip, string $email): bool {
    // Independent buckets prevent cycling through email addresses from
    // bypassing the IP limit, or changing networks to bypass the email limit.
    return rate_limit_bucket($config, 'ip', $ip, 6, 20)
        && rate_limit_bucket($config, 'email', $email, 3, 8);
}

function verify_turnstile(array $config, string $token, string $ip): bool {
    if ($token === '' || strlen($token) > 2048 || !function_exists('curl_init')) return false;
    $payload = http_build_query([
        'secret' => $config['turnstile_secret'],
        'response' => $token,
        'remoteip' => $ip,
    ]);
    $curl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    if ($curl === false) return false;
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ]);
    $raw = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);
    $result = is_string($raw) ? json_decode($raw, true) : null;
    return $status === 200
        && is_array($result)
        && ($result['success'] ?? false) === true
        && ($result['action'] ?? '') === TURNSTILE_ACTION
        && in_array($result['hostname'] ?? '', $config['allowed_hostnames'], true);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, 'Method not allowed.');

$configPath = dirname(__DIR__, 2) . '/private/inquiry-config.php';
if (!is_file($configPath)) respond(503, 'Secure inquiry delivery is not configured yet.');
$config = require $configPath;
if (!is_array($config) || ($config['enabled'] ?? false) !== true) respond(503, 'Secure inquiry delivery is not configured yet.');
foreach (['turnstile_secret', 'rate_limit_secret', 'rate_limit_directory', 'recipient_email', 'from_email', 'from_name'] as $key) {
    if (!isset($config[$key]) || !is_string($config[$key]) || $config[$key] === '' || str_contains($config[$key], "\r") || str_contains($config[$key], "\n") || str_starts_with($config[$key], 'replace-with-')) {
        audit('invalid_server_configuration');
        respond(503, 'Secure inquiry delivery is not configured yet.');
    }
}
if (!filter_var($config['recipient_email'], FILTER_VALIDATE_EMAIL) || !filter_var($config['from_email'], FILTER_VALIDATE_EMAIL) || !is_array($config['allowed_origins'] ?? null) || !is_array($config['allowed_hostnames'] ?? null)) {
    audit('invalid_server_configuration');
    respond(503, 'Secure inquiry delivery is not configured yet.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!is_string($origin) || !in_array($origin, $config['allowed_origins'], true)) {
    audit('origin_rejected', ['ip' => request_ip()]);
    respond(403, 'This request was not accepted.');
}
if (($_SERVER['CONTENT_TYPE'] ?? '') !== 'application/json') reject_bad_request('invalid_content_type');
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) reject_bad_request('body_too_large');

$rawBody = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (!is_string($rawBody) || strlen($rawBody) === 0 || strlen($rawBody) > MAX_BODY_BYTES) reject_bad_request('invalid_body');
try {
    $input = json_decode($rawBody, true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    reject_bad_request('invalid_json');
}
if (!is_array($input) || array_is_list($input)) reject_bad_request('invalid_payload');

if (read_string($input['website'] ?? '', 200) !== '') {
    audit('honeypot_rejected', ['ip' => request_ip()]);
    respond(202, 'Thanks — your inquiry has been received.');
}
$startedAt = $input['formStartedAt'] ?? null;
if (!is_int($startedAt) || (int) (microtime(true) * 1000) - $startedAt < MIN_COMPLETION_MS || $startedAt > (int) (microtime(true) * 1000)) {
    reject_bad_request('invalid_completion_time');
}

$owner = get_object($input, 'owner');
$dog = get_object($input, 'dog');
$firstName = read_string($owner['firstName'] ?? null, 60, true);
$lastName = read_string($owner['lastName'] ?? null, 60, true);
$email = read_string($owner['email'] ?? null, 160, true);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) reject_bad_request('invalid_email');
$phone = read_string($owner['phone'] ?? null, 30, true);
$location = read_string($owner['location'] ?? null, 100, true);
$contactPreference = require_allowed(read_string($owner['contactPreference'] ?? null, 20, true), ['Email', 'Phone call', 'Text message']);
$dogName = read_string($dog['name'] ?? null, 60, true);
$breed = read_string($dog['breed'] ?? null, 80, true);
$dogAge = read_string($dog['age'] ?? null, 30, true);
$dogSex = require_allowed(read_string($dog['sex'] ?? null, 10, true), ['Female', 'Male']);
$history = read_string($dog['trainingHistory'] ?? '', 1200);
$program = require_allowed(read_string($input['program'] ?? null, 50, true), ['Puppy Raising & Starting', 'Puppy Head Start', 'Gun Dog Training', 'Advanced Gun Dog', 'Boarding', 'Not sure yet']);
$goals = read_string($input['goals'] ?? null, 1600, true);
$timing = read_string($input['timing'] ?? null, 80, true);
$notes = read_string($input['notes'] ?? '', 300);
$token = read_string($input['turnstileToken'] ?? null, 2048, true);
if (($input['consent'] ?? false) !== true) reject_bad_request('missing_consent');
$ip = request_ip();

if (!verify_turnstile($config, $token, $ip)) {
    audit('turnstile_rejected', ['ip' => $ip]);
    respond(403, 'Please complete the security check and try again.');
}
if (!rate_limit($config, $ip, $email)) {
    audit('rate_limited', ['ip' => $ip]);
    respond(429, 'Please wait a little while before sending another inquiry.');
}

$message = implode("\n", [
    'New Lake Byron Retrievers training inquiry',
    '',
    'Program: ' . $program,
    'Preferred timing: ' . $timing,
    '',
    'Owner',
    'Name: ' . $firstName . ' ' . $lastName,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Location: ' . $location,
    'Contact preference: ' . $contactPreference,
    '',
    'Dog',
    'Name: ' . $dogName,
    'Breed: ' . $breed,
    'Age: ' . $dogAge,
    'Sex: ' . $dogSex,
    'Prior training: ' . ($history !== '' ? $history : 'None provided'),
    'Goals: ' . $goals,
    'Notes: ' . ($notes !== '' ? $notes : 'None provided'),
]);

$subject = 'Training inquiry: ' . $program;
$headers = [
    'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Content-Type-Options: nosniff',
];
if (!mail($config['recipient_email'], $subject, $message, implode("\r\n", $headers))) {
    audit('mail_delivery_failed', ['ip' => $ip]);
    respond(503, 'We could not send that inquiry. Please try again or call (605) 221-0649.');
}

audit('submitted', ['ip' => $ip, 'program' => $program]);
respond(200, 'Your inquiry has been sent to our team. We’ll be in touch soon.');
