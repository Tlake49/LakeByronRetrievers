# Inquiry form setup for a future launch

The two-step form remains in `app/components/InquiryModal.tsx`, and its PHP receiver source remains in `server/inquiry.php`. Neither is included in the public site. Training and contact inquiry buttons currently open an email to `info@lakeslodgesd.com`. The browser must never receive the Turnstile secret, rate-limit secret, or mail credentials.

## Controls prepared in the receiver source

- Cloudflare Turnstile is verified server-side with the expected `training_inquiry` action and production hostname.
- The endpoint accepts only same-origin `POST` JSON under 24 KiB, with a strict request shape, bounded fields, email validation, and closed value lists.
- Newlines are rejected in every user-controlled mail field, preventing mail-header injection. Visitor input is rendered only as plain text; no HTML, commands, database queries, uploads, or URLs are executed.
- A concealed honeypot and a minimum completion time screen basic automation.
- Separate rate limits are keyed with an HMAC of IP and normalized email, so the stored limiter files do not contain either value in clear text. The IP limit is six per hour and twenty per day; the email limit is three per hour and eight per day.
- The receiving mailbox is fixed to `info@lakeslodgesd.com`; the visitor email is only `Reply-To`. Internal failures return generic messages and logs do not record form contents, tokens, or email addresses.

## One-time SiteGround configuration

1. In Cloudflare Turnstile, open the existing widget and allow `lakebyronretrievers.com` and `www.lakebyronretrievers.com`. Copy its **secret key** privately; do not put it in Git or share it in chat.
2. Connect to SiteGround over SSH and create the non-public directory:

   ```bash
   mkdir -p /home/customer/www/lakebyronretrievers.com/private/rate-limits
   chmod 700 /home/customer/www/lakebyronretrievers.com/private /home/customer/www/lakebyronretrievers.com/private/rate-limits
   ```

3. Copy `server/inquiry-config.php.example` from the repository to `/home/customer/www/lakebyronretrievers.com/private/inquiry-config.php`. Add the Turnstile secret and a fresh `openssl rand -hex 32` value for `rate_limit_secret`, then set `enabled` to `true` only after testing. Lock it down:

   ```bash
   chmod 600 /home/customer/www/lakebyronretrievers.com/private/inquiry-config.php
   ```

4. Choose and verify the mail sender. `info@lakeslodgesd.com` is already the recipient. The exact address `forms@lakebyronretrievers.com` is optional. However, [SiteGround says its sendmail service needs an existing email address](https://www.siteground.com/kb/do-i-need-a-valid-email-account-to-use-sendmail), so the current PHP `mail()` handler needs a valid sender account it can use. Put that account in `from_email` and verify SPF/DKIM/DMARC and delivery with IT. If `info@lakeslodgesd.com` is hosted elsewhere and you want to send as it, the present handler must be changed to its authenticated SMTP or API transport first; merely entering SMTP credentials in the config will not make it use SMTP.
5. After steps 1–4 are complete, move `server/inquiry.php` to `public/api/inquiry.php`, restore the `InquiryModal` import and render in `app/layout.tsx`, and replace the inquiry `mailto:` links with form triggers. Then set `NEXT_PUBLIC_CONTACT_FORM_ENABLED` to `"true"` in `.github/workflows/deploy-siteground.yml`, commit, and deploy. The live server configuration remains outside Git and survives deployments.

## Operational safety

- Keep Cloudflare WAF managed rules and Bot Fight Mode enabled; review Turnstile analytics and SiteGround/PHP error logs regularly.
- Do not allow attachments, payment data, medical records, URLs, or arbitrary HTML in this form.
- Keep PHP and SiteGround managed software updated. Restrict SSH and GitHub repository access with MFA.
- Use an authenticated SMTP or transactional email provider if PHP `mail()` is not configured with a domain-authenticated sender. Never add its password/API key to the repo or a `NEXT_PUBLIC_*` variable. A successful `mail()` return means the server accepted the message for sending; confirm actual arrival in the recipient inbox.

Cloudflare requires server-side Siteverify validation: tokens expire after five minutes and are single use. See [Cloudflare’s Turnstile validation guide](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
