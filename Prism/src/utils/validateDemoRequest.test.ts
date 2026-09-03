import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDemoMailto,
  normalizeDemoRequest,
  validateDemoRequest,
} from "./validateDemoRequest";

const valid = {
  name: "  Riya Shah  ",
  company: "  North Labs  ",
  email: "  riya@northlabs.example  ",
  phone: "9876543210",
  message: "Show us attendance and quotes.",
};

describe("validateDemoRequest", () => {
  it("should accept a complete valid request", () => {
    const errors = validateDemoRequest(valid);
    assert.deepEqual(errors, {});
  });

  it("should reject empty name, company, and invalid email", () => {
    const errors = validateDemoRequest({
      name: " ",
      company: "",
      email: "not-an-email",
      phone: "",
      message: "",
    });
    assert.equal(errors.name, "Enter your name.");
    assert.equal(errors.company, "Enter your company name.");
    assert.equal(errors.email, "Enter a valid work email.");
  });

  it("should reject oversized fields", () => {
    const errors = validateDemoRequest({
      name: "a".repeat(201),
      company: "b".repeat(201),
      email: `${"c".repeat(190)}@x.io`,
      phone: "1".repeat(31),
      message: "m".repeat(2001),
    });
    assert.equal(errors.name, "Name is too long.");
    assert.equal(errors.company, "Company name is too long.");
    assert.equal(errors.phone, "Phone number is too long.");
    assert.equal(errors.message, "Message is too long.");
  });

  it("should allow empty optional phone and message", () => {
    const errors = validateDemoRequest({
      ...valid,
      phone: "",
      message: "",
    });
    assert.deepEqual(errors, {});
  });
});

describe("normalizeDemoRequest", () => {
  it("should trim fields and lowercase email", () => {
    const result = normalizeDemoRequest(valid);
    assert.equal(result.name, "Riya Shah");
    assert.equal(result.company, "North Labs");
    assert.equal(result.email, "riya@northlabs.example");
  });
});

describe("buildDemoMailto", () => {
  it("should encode a mailto URL for the company inbox", () => {
    const href = buildDemoMailto(valid, "info@medivastsolutions.com");
    assert.match(href, /^mailto:info@medivastsolutions.com\?/);
    assert.match(href, /North%20Labs/);
  });
});
