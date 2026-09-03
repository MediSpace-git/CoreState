"use client";

import { useState } from "react";
import { companyContact } from "@prism/config/content";
import {
  buildDemoMailto,
  type DemoRequestErrors,
  type DemoRequestInput,
  validateDemoRequest,
} from "@prism/utils/validateDemoRequest";

const EMPTY: DemoRequestInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function DemoRequestForm() {
  const [values, setValues] = useState<DemoRequestInput>(EMPTY);
  const [errors, setErrors] = useState<DemoRequestErrors>({});

  const onChange = (field: keyof DemoRequestInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDemoRequest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    window.location.href = buildDemoMailto(values, companyContact.email);
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-5" noValidate>
      <Field
        id="name"
        label="Name"
        value={values.name}
        error={errors.name}
        onChange={(value) => onChange("name", value)}
        required
      />
      <Field
        id="company"
        label="Company"
        value={values.company}
        error={errors.company}
        onChange={(value) => onChange("company", value)}
        required
      />
      <Field
        id="email"
        label="Work email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(value) => onChange("email", value)}
        required
      />
      <Field
        id="phone"
        label="Phone"
        type="tel"
        value={values.phone}
        error={errors.phone}
        onChange={(value) => onChange("phone", value)}
      />
      <Field
        id="message"
        label="What do you want to see?"
        value={values.message}
        error={errors.message}
        onChange={(value) => onChange("message", value)}
        multiline
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center bg-[var(--signal)] px-7 text-sm font-semibold text-[var(--ink)]"
      >
        Request a demo
      </button>
      <p className="text-sm text-[var(--paper-muted)]">
        Opens your email to {companyContact.email}. You can also call{" "}
        <a href={companyContact.phoneHref} className="text-[var(--paper)] underline">
          {companyContact.phone}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  required = false,
  multiline = false,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const shared = {
    id,
    name: id,
    value,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
    className:
      "mt-2 w-full border border-[var(--line)] bg-[var(--ink-elevated)] px-3 py-2.5 text-sm text-[var(--paper)] outline-none focus:border-[var(--signal)]",
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm text-[var(--paper)]">
        {label}
      </label>
      {multiline ? <textarea {...shared} rows={4} /> : <input {...shared} type={type} />}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
