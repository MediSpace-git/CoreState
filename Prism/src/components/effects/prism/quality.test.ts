import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PRISM_QUALITY_PROFILES,
  resolvePrismQuality,
} from "./quality";

describe("resolvePrismQuality", () => {
  it("should return medium profile by default", () => {
    const profile = resolvePrismQuality(undefined, false);
    assert.deepEqual(profile, PRISM_QUALITY_PROFILES.medium);
  });

  it("should return requested quality when motion is allowed", () => {
    const profile = resolvePrismQuality("high", false);
    assert.deepEqual(profile, PRISM_QUALITY_PROFILES.high);
  });

  it("should clamp to low settings when reduced motion is preferred", () => {
    const profile = resolvePrismQuality("high", true);
    assert.equal(profile.renderScale, PRISM_QUALITY_PROFILES.low.renderScale);
    assert.equal(profile.raySteps, PRISM_QUALITY_PROFILES.low.raySteps);
    assert.equal(profile.maxDpr, 1);
    assert.ok(profile.maxFps <= 20);
  });
});
