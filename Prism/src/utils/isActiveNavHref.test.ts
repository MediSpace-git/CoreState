import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isActiveNavHref } from "./isActiveNavHref";

const NAV = ["/product", "/product/field-operations", "/product/workforce", "/security"] as const;

describe("isActiveNavHref", () => {
  it("should mark an exact path as active", () => {
    assert.equal(isActiveNavHref("/security", "/security", NAV), true);
  });

  it("should not mark sibling routes as active", () => {
    assert.equal(isActiveNavHref("/product/workforce", "/product/field-operations", NAV), false);
  });

  it("should prefer the more specific product child over Product", () => {
    assert.equal(isActiveNavHref("/product/field-operations", "/product/field-operations", NAV), true);
    assert.equal(isActiveNavHref("/product/field-operations", "/product", NAV), false);
  });

  it("should mark Product on the product overview only", () => {
    assert.equal(isActiveNavHref("/product", "/product", NAV), true);
    assert.equal(isActiveNavHref("/product/", "/product", NAV), true);
  });

  it("should not treat home as a prefix of every route", () => {
    assert.equal(isActiveNavHref("/product", "/", ["/"]), false);
    assert.equal(isActiveNavHref("/", "/", ["/"]), true);
  });

  it("should return false for empty pathname or href", () => {
    assert.equal(isActiveNavHref("", "/product", NAV), false);
    assert.equal(isActiveNavHref("/product", "", NAV), false);
  });
});
