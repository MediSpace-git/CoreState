"use client";

import { useRef, useState, type FormEvent } from "react";
import WordReveal from "@/components/WordReveal";
import { site } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, REDUCED, EASE } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

const INTERESTS = [
  "Product work",
  "Custom software",
  "Field operations",
  "Not sure yet",
];

const POINTS = [
  "We start from how the work actually happens.",
  "We ship systems meant to be owned for years.",
  "We build products we operate ourselves.",
];

const fieldClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[15px] text-fg outline-none transition-colors duration-300 placeholder:text-faint focus:border-fg";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  useReveal(ref);

  const { contact } = site;
  const mailto = contact.email ? `mailto:${contact.email}` : null;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const fields = gsap.utils.toArray<HTMLElement>("[data-field]");
        if (!fields.length) return;
        gsap.fromTo(
          fields,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: EASE,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
      mm.add(REDUCED, () => {
        gsap.set("[data-field]", { opacity: 1, y: 0 });
      });
    },
    { scope: ref }
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (mailto) {
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        interest ? `Interest: ${interest}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `${mailto}?subject=${encodeURIComponent(
        "Project inquiry"
      )}&body=${encodeURIComponent(body)}`;
    }

    setSent(true);
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="scroll-mt-20 bg-surface"
      aria-label="Contact"
    >
      <div className="container-x section-y">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-8">
            <p className="section-label" data-reveal>
              Contact
            </p>
            <WordReveal
              text="Have a complex problem worth solving?"
              className="text-display mt-6 font-semibold leading-[1.06] tracking-tight text-fg"
              delay={0.08}
            />
            <p
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
              data-reveal
              data-delay="0.16"
            >
              Tell us what you&apos;re building, improving, or trying to
              automate. We&apos;ll come back with a clear next step.
            </p>

            <ul className="mt-10 max-w-sm space-y-4" data-reveal>
              {POINTS.map((point) => (
                <li key={point} className="text-sm leading-relaxed text-muted">
                  {point}
                </li>
              ))}
            </ul>

            {contact.email || contact.phone ? (
              <div className="mt-10 space-y-2 text-sm text-muted" data-reveal>
                {contact.email ? (
                  <p>
                    <a href={`mailto:${contact.email}`} className="hover:text-fg">
                      {contact.email}
                    </a>
                  </p>
                ) : null}
                {contact.phone ? (
                  <p>
                    <a href={`tel:${contact.phone}`} className="hover:text-fg">
                      {contact.phone}
                    </a>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <p className="border-t border-line pt-8 text-lg text-fg">
                Received. We&apos;ll be in touch.
              </p>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="space-y-1"
                noValidate
              >
                <label className="block" data-field>
                  <span className="sr-only">Name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Name"
                    className={fieldClass}
                  />
                </label>
                <label className="block" data-field>
                  <span className="sr-only">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Work email"
                    className={fieldClass}
                  />
                </label>
                <label className="block" data-field>
                  <span className="sr-only">Company</span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company"
                    className={fieldClass}
                  />
                </label>
                <label className="block" data-field>
                  <span className="sr-only">What this is about</span>
                  <select name="interest" defaultValue="" className={`${fieldClass} appearance-none`}>
                    <option value="" disabled>
                      What this is about
                    </option>
                    {INTERESTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block" data-field>
                  <span className="sr-only">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What are you trying to change?"
                    className={`${fieldClass} resize-none`}
                  />
                </label>
                <div className="pt-8" data-field>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center bg-fg px-6 text-sm font-medium tracking-tight text-bg transition-colors duration-300 hover:bg-accent hover:text-invert"
                  >
                    Send inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
