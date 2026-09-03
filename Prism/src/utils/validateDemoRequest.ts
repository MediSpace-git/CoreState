const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MAX_TEXT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

export type DemoRequestInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export type DemoRequestErrors = Partial<Record<keyof DemoRequestInput, string>>;

export function normalizeDemoRequest(input: DemoRequestInput): DemoRequestInput {
  return {
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    message: input.message.trim(),
  };
}

export function validateDemoRequest(input: DemoRequestInput): DemoRequestErrors {
  const values = normalizeDemoRequest(input);
  const errors: DemoRequestErrors = {};

  if (values.name.length < MIN_NAME_LENGTH) {
    errors.name = "Enter your name.";
  } else if (values.name.length > MAX_TEXT_LENGTH) {
    errors.name = "Name is too long.";
  }

  if (values.company.length < MIN_NAME_LENGTH) {
    errors.company = "Enter your company name.";
  } else if (values.company.length > MAX_TEXT_LENGTH) {
    errors.company = "Company name is too long.";
  }

  if (!EMAIL_PATTERN.test(values.email) || values.email.length > MAX_TEXT_LENGTH) {
    errors.email = "Enter a valid work email.";
  }

  if (values.phone.length > 30) {
    errors.phone = "Phone number is too long.";
  }

  if (values.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Message is too long.";
  }

  return errors;
}

export function buildDemoMailto(input: DemoRequestInput, to: string): string {
  const values = normalizeDemoRequest(input);
  const subject = `Prism demo request — ${values.company}`;
  const body = [
    `Name: ${values.name}`,
    `Company: ${values.company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "—"}`,
    "",
    values.message || "I would like a Prism demo.",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
