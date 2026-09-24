import test from "node:test";
import assert from "node:assert/strict";
import { recommendation, type Segment } from "./packages-data.ts";

function fit(
  overrides: Partial<{
    segment: Segment;
    startingOut: boolean;
    dormant: boolean;
    transactions: number;
    turnover: number;
    staff: number;
    directors: number;
    platforms: "one" | "multi";
    complex: boolean;
  }> = {},
) {
  return recommendation({
    segment: "company",
    startingOut: false,
    dormant: false,
    transactions: 30,
    turnover: 150_000,
    staff: 0,
    directors: 1,
    platforms: "one",
    complex: false,
    ...overrides,
  });
}

test("starting-out offers route to the correct setup service", () => {
  assert.equal(fit({ startingOut: true }).name, "Company Launch");
  assert.equal(fit({ segment: "sole-trader", startingOut: true }).name, "Sole Trader Start-Up");
  assert.equal(fit({ segment: "contractor", startingOut: true }).name, "Contractor Launch");
  assert.equal(fit({ segment: "ecommerce", startingOut: true }).name, "E-commerce Finance Setup");
});

test("sole trader thresholds progress Essentials → Plus → Scale → Bespoke", () => {
  assert.equal(fit({ segment: "sole-trader", transactions: 20, turnover: 80_000 }).name, "Sole Trader Essentials");
  assert.equal(fit({ segment: "sole-trader", transactions: 21, turnover: 80_000 }).name, "Sole Trader Plus");
  assert.equal(fit({ segment: "sole-trader", transactions: 61, turnover: 80_000 }).name, "Sole Trader Scale");
  assert.equal(fit({ segment: "sole-trader", transactions: 151, turnover: 80_000 }).name, "Bespoke");
});

test("e-commerce thresholds account for platforms, accounting volume and sales", () => {
  assert.equal(fit({ segment: "ecommerce", transactions: 50, turnover: 150_000, platforms: "one" }).name, "E-commerce Launch");
  assert.equal(fit({ segment: "ecommerce", transactions: 50, turnover: 150_000, platforms: "multi" }).name, "E-commerce Multi-channel");
  assert.equal(fit({ segment: "ecommerce", transactions: 101, turnover: 150_000, platforms: "one" }).name, "E-commerce Scale");
  assert.equal(fit({ segment: "ecommerce", transactions: 201, turnover: 150_000, platforms: "one" }).name, "Bespoke");
});

test("limited company thresholds route dormant, growth, scale and bespoke correctly", () => {
  assert.equal(fit({ dormant: true, transactions: 10, turnover: 10_000 }).name, "Dormant & Holding");
  assert.equal(fit({ transactions: 31 }).name, "LTD Growth");
  assert.equal(fit({ complex: true }).name, "LTD Scale");
  assert.equal(fit({ transactions: 121 }).name, "Bespoke");
});

test("contractor plan falls back to the closest company package when it no longer fits", () => {
  assert.equal(fit({ segment: "contractor", transactions: 15, turnover: 150_000 }).name, "Contractor");
  assert.equal(fit({ segment: "contractor", transactions: 16, turnover: 150_000 }).name, "LTD Starter");
});
