"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const submissionsEnabled = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

const programs = [
  "Puppy Raising & Starting",
  "Puppy Head Start",
  "Gun Dog Training",
  "Advanced Gun Dog",
  "Boarding",
  "Not sure yet",
];

type Inquiry = {
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  phone: string;
  location: string;
  contactPreference: string;
  dogName: string;
  breed: string;
  dogAge: string;
  dogSex: string;
  program: string;
  trainingHistory: string;
  goals: string;
  timing: string;
  notes: string;
  website: string;
  consent: boolean;
};

const emptyInquiry: Inquiry = {
  ownerFirstName: "",
  ownerLastName: "",
  email: "",
  phone: "",
  location: "",
  contactPreference: "Email",
  dogName: "",
  breed: "",
  dogAge: "",
  dogSex: "",
  program: "Not sure yet",
  trainingHistory: "",
  goals: "",
  timing: "",
  notes: "",
  website: "",
  consent: false,
};

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function InquiryModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const startedAt = useRef(0);
  const [step, setStep] = useState<1 | 2>(1);
  const [inquiry, setInquiry] = useState<Inquiry>(emptyInquiry);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "preview" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    function openFromTrigger(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-inquiry-program]") : null;
      if (!target) return;

      event.preventDefault();
      triggerRef.current = target;
      const selectedProgram = target.dataset.inquiryProgram || "Not sure yet";
      setInquiry((current) => ({ ...current, program: selectedProgram }));
      setStep(1);
      setStatus("idle");
      setMessage("");
      startedAt.current = Date.now();
      dialogRef.current?.showModal();
      document.body.classList.add("inquiry-open");
    }

    document.addEventListener("click", openFromTrigger);
    return () => document.removeEventListener("click", openFromTrigger);
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
    document.body.classList.remove("inquiry-open");
    triggerRef.current?.focus();
  }

  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    setInquiry((current) => ({ ...current, [key]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  }

  function continueToDog() {
    if (!formRef.current?.reportValidity()) return;
    setStep(2);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus());
  }

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;

    setSending(true);
    setStatus("idle");
    setMessage("");

    if (inquiry.website) {
      setStatus("success");
      setMessage("Thanks — your inquiry has been received.");
      setSending(false);
      return;
    }

    if (Date.now() - startedAt.current < 2500) {
      setStatus("error");
      setMessage("Please take another moment to review the details before sending.");
      setSending(false);
      return;
    }

    if (!submissionsEnabled || !endpoint || !recaptchaSiteKey) {
      setStatus("preview");
      setMessage("The form experience is ready. Sending will activate after IT adds the secure form endpoint and reCAPTCHA keys.");
      setSending(false);
      return;
    }

    try {
      const token = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha) {
          reject(new Error("reCAPTCHA unavailable"));
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha?.execute(recaptchaSiteKey, { action: "training_inquiry" }).then(resolve).catch(reject);
        });
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: {
            firstName: clean(inquiry.ownerFirstName),
            lastName: clean(inquiry.ownerLastName),
            email: clean(inquiry.email),
            phone: clean(inquiry.phone),
            location: clean(inquiry.location),
            contactPreference: inquiry.contactPreference,
          },
          dog: {
            name: clean(inquiry.dogName),
            breed: clean(inquiry.breed),
            age: clean(inquiry.dogAge),
            sex: inquiry.dogSex,
            trainingHistory: clean(inquiry.trainingHistory),
          },
          program: inquiry.program,
          goals: clean(inquiry.goals),
          timing: clean(inquiry.timing),
          notes: clean(inquiry.notes),
          recaptchaToken: token,
          recaptchaAction: "training_inquiry",
          submittedFrom: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setMessage("Your inquiry is headed to Jackson. We’ll be in touch soon.");
      setInquiry(emptyInquiry);
    } catch {
      setStatus("error");
      setMessage("We couldn’t send that inquiry. Please try again or call (605) 221-0649.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {submissionsEnabled && recaptchaSiteKey ? <Script src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}&trustedtypes=true`} strategy="afterInteractive" /> : null}
      <dialog
        className="inquiry-dialog"
        ref={dialogRef}
        aria-labelledby="inquiry-title"
        onCancel={(event) => { event.preventDefault(); closeDialog(); }}
        onClose={() => document.body.classList.remove("inquiry-open")}
      >
        <div className="inquiry-shell">
          <header className="inquiry-header">
            <div>
              <p className="kicker">Training inquiry</p>
              <h2 id="inquiry-title">Tell us about your team.</h2>
            </div>
            <button className="inquiry-close" type="button" onClick={closeDialog} aria-label="Close inquiry form">×</button>
          </header>

          <div className="inquiry-progress" aria-label={`Step ${step} of 2`}>
            <button className={step === 1 ? "is-current" : "is-complete"} type="button" onClick={() => setStep(1)}><span>01</span> Owner</button>
            <div className="inquiry-progress-line" />
            <button className={step === 2 ? "is-current" : ""} type="button" disabled={step === 1}><span>02</span> Dog &amp; goals</button>
          </div>

          <form ref={formRef} onSubmit={submitInquiry} className="inquiry-form">
            <div className="inquiry-honeypot" aria-hidden="true">
              <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={inquiry.website} onChange={(event) => update("website", event.target.value)} /></label>
            </div>

            {step === 1 ? (
              <fieldset className="inquiry-step">
                <legend><span>First, you.</span>How should Jackson reach you?</legend>
                <div className="inquiry-fields">
                  <label>First name<input required maxLength={60} autoComplete="given-name" value={inquiry.ownerFirstName} onChange={(event) => update("ownerFirstName", event.target.value)} /></label>
                  <label>Last name<input required maxLength={60} autoComplete="family-name" value={inquiry.ownerLastName} onChange={(event) => update("ownerLastName", event.target.value)} /></label>
                  <label>Email<input required type="email" maxLength={160} autoComplete="email" value={inquiry.email} onChange={(event) => update("email", event.target.value)} /></label>
                  <label>Phone<input required type="tel" maxLength={30} autoComplete="tel" inputMode="tel" value={inquiry.phone} onChange={(event) => update("phone", event.target.value)} /></label>
                  <label className="field-wide">City &amp; state<input required maxLength={100} autoComplete="address-level2" placeholder="Huron, South Dakota" value={inquiry.location} onChange={(event) => update("location", event.target.value)} /></label>
                  <label className="field-wide">Best way to follow up<select value={inquiry.contactPreference} onChange={(event) => update("contactPreference", event.target.value)}><option>Email</option><option>Phone call</option><option>Text message</option></select></label>
                </div>
                <div className="inquiry-actions"><span>Step 1 of 2</span><button className="button button-primary" type="button" onClick={continueToDog}>Meet the dog <span aria-hidden="true">→</span></button></div>
              </fieldset>
            ) : (
              <fieldset className="inquiry-step">
                <legend><span>Now, the dog.</span>What are you hoping to build?</legend>
                <div className="inquiry-fields">
                  <label>Dog’s name<input required maxLength={60} autoComplete="off" value={inquiry.dogName} onChange={(event) => update("dogName", event.target.value)} /></label>
                  <label>Breed<input required maxLength={80} autoComplete="off" value={inquiry.breed} onChange={(event) => update("breed", event.target.value)} /></label>
                  <label>Age<input required maxLength={30} placeholder="8 months" value={inquiry.dogAge} onChange={(event) => update("dogAge", event.target.value)} /></label>
                  <label>Sex<select required value={inquiry.dogSex} onChange={(event) => update("dogSex", event.target.value)}><option value="" disabled>Select one</option><option>Female</option><option>Male</option></select></label>
                  <label className="field-wide">Program<select required value={inquiry.program} onChange={(event) => update("program", event.target.value)}>{programs.map((program) => <option key={program}>{program}</option>)}</select></label>
                  <label className="field-wide">Prior training<textarea maxLength={1200} rows={3} placeholder="Commands, birds, water, gunfire, crate training…" value={inquiry.trainingHistory} onChange={(event) => update("trainingHistory", event.target.value)} /></label>
                  <label className="field-wide">Hunting or competition goals<textarea required maxLength={1600} rows={4} placeholder="Tell us what a great season with this dog would look like." value={inquiry.goals} onChange={(event) => update("goals", event.target.value)} /></label>
                  <label>Preferred timing<input required maxLength={80} placeholder="Spring 2027" value={inquiry.timing} onChange={(event) => update("timing", event.target.value)} /></label>
                  <label>Anything else?<input maxLength={300} placeholder="Temperament, routines or questions" value={inquiry.notes} onChange={(event) => update("notes", event.target.value)} /></label>
                </div>
                <label className="inquiry-consent"><input required type="checkbox" checked={inquiry.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I agree that Lake Byron Retrievers may contact me about this inquiry. Please do not include payment information or sensitive veterinary records.</span></label>
                <div className="inquiry-actions"><button className="inquiry-back" type="button" onClick={() => setStep(1)}>← Back</button><button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send inquiry"}</button></div>
              </fieldset>
            )}

            {message ? <p className={`inquiry-status inquiry-status-${status}`} role="status">{message}</p> : null}
            <p className="inquiry-security-note">Protected by reCAPTCHA when live. Information is used only to respond to this training inquiry.</p>
          </form>
        </div>
      </dialog>
    </>
  );
}
