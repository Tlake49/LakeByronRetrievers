# Contact form production setup

The website contains the complete two-step inquiry experience. Submission remains in preview mode until the endpoint and reCAPTCHA key in `.env.example` are configured during the site build and `NEXT_PUBLIC_CONTACT_FORM_ENABLED` is deliberately changed to `true`.

The receiving endpoint must:

- accept only `POST` requests with JSON bodies and enforce a small request-size limit;
- allow requests only from the production Lake Byron Retrievers origin;
- validate every field again on the server using strict length and value allowlists;
- verify `recaptchaToken` with Google using a secret stored only on the server;
- require the returned action to equal `training_inquiry`, verify the hostname, and enforce an IT-approved score threshold;
- reject expired, duplicate, missing, or failed reCAPTCHA tokens;
- rate-limit by IP and by normalized email address, with burst and daily limits;
- discard honeypot submissions and log only the minimum information needed for abuse review;
- escape all user-provided text before placing it into HTML email and never execute or interpolate it into commands or queries;
- send mail through an authenticated provider to the future company email group, with a fixed sender and the visitor’s email used only as `Reply-To`;
- return generic success/error responses without reflecting submitted content or exposing provider details;
- keep secrets, mail credentials, and reCAPTCHA secret keys outside the repository;
- define retention, access, deletion, monitoring, and incident-response policies with IT before launch.

No public web form can be guaranteed completely safe. These controls create defense in depth, while the server-side validation, reCAPTCHA verification, rate limiting, and mail configuration remain the security boundary.
