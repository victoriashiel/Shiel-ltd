import test from "node:test";
import assert from "node:assert/strict";
import { regionContent } from "./region-content.ts";
import { regionalPackages } from "./regional-packages.ts";
import { getRegionAlternates, regionByCountryCode, regionSlugs, regions } from "./regions.ts";

test("every supported region has content and package pricing", () => {
  for (const slug of regionSlugs) {
    assert.ok(regionContent[slug], `missing region content for ${slug}`);
    assert.ok(regionalPackages[slug], `missing package set for ${slug}`);
    assert.ok(regionalPackages[slug].packages.length >= 4, `expected at least four packages for ${slug}`);
    for (const plan of regionalPackages[slug].packages) {
      assert.ok(plan.price > 0, `invalid price for ${slug}: ${plan.name}`);
      assert.ok(plan.features.length >= 4, `expected four core features for ${slug}: ${plan.name}`);
    }
  }
});

test("regional currencies match the local pricing currency", () => {
  assert.equal(regionalPackages.ireland.currency, "EUR");
  assert.equal(regionalPackages.uk.currency, "GBP");
  assert.equal(regionalPackages.uae.currency, "AED");
  assert.equal(regionalPackages.gibraltar.currency, "GIP");
  assert.equal(regionalPackages.spain.currency, "EUR");
});

test("country codes resolve to the intended region", () => {
  assert.equal(regionByCountryCode.IE.slug, "ireland");
  assert.equal(regionByCountryCode.GB.slug, "uk");
  assert.equal(regionByCountryCode.AE.slug, "uae");
  assert.equal(regionByCountryCode.GI.slug, "gibraltar");
  assert.equal(regionByCountryCode.ES.slug, "spain");
});

test("hreflang alternates are reciprocal and keep the global page as x-default", () => {
  const alternates = getRegionAlternates();
  assert.equal(alternates["x-default"], "/");

  for (const slug of regionSlugs) {
    const region = regions[slug];
    assert.equal(alternates[region.locale], region.path);
  }
});
