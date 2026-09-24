import test from "node:test";
import assert from "node:assert/strict";
import { regionContent } from "./region-content.ts";
import { regionalPackages } from "./regional-packages.ts";
import { getRegionAlternates, regionByCountryCode, regionSlugs, regions } from "./regions.ts";
import { regionalPathFor, regionalizeHref } from "./regional-routing.ts";

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
  assert.equal(regionalPackages.ie.currency, "EUR");
  assert.equal(regionalPackages.uk.currency, "GBP");
  assert.equal(regionalPackages.ae.currency, "AED");
  assert.equal(regionalPackages.gi.currency, "GIP");
  assert.equal(regionalPackages.es.currency, "EUR");
});

test("country codes resolve to the intended region", () => {
  assert.equal(regionByCountryCode.IE.slug, "ie");
  assert.equal(regionByCountryCode.GB.slug, "uk");
  assert.equal(regionByCountryCode.AE.slug, "ae");
  assert.equal(regionByCountryCode.GI.slug, "gi");
  assert.equal(regionByCountryCode.ES.slug, "es");
});

test("every regional package route has a stable local path", () => {
  for (const slug of regionSlugs) {
    const region = regions[slug];
    assert.equal(`${region.path}/packages`, `/${slug}/packages`);
  }
});

test("hreflang alternates are reciprocal and keep the global page as x-default", () => {
  const alternates = getRegionAlternates();
  assert.equal(alternates["x-default"], "/");

  for (const slug of regionSlugs) {
    const region = regions[slug];
    assert.equal(alternates[region.locale], region.path);
  }
});


test("region switching preserves mirrored page context", () => {
  assert.equal(regionalPathFor("/uk/tax-compliance", "ie"), "/ie/tax-compliance");
  assert.equal(regionalPathFor("/ae/packages", "es"), "/es/packages");
  assert.equal(regionalPathFor("/gi/contact", "global"), "/contact");
  assert.equal(
    regionalPathFor("/uk/international-accounting/non-resident-directors", "ie"),
    "/ie/international-accounting/non-resident-directors",
  );
  assert.equal(regionalPathFor("/privacy", "ie"), "/ie");
});

test("regional links preserve anchors and use the active regional namespace", () => {
  assert.equal(regionalizeHref("/tax-compliance", "uk"), "/uk/tax-compliance");
  assert.equal(regionalizeHref("/packages", "ae"), "/ae/packages");
  assert.equal(regionalizeHref("/#about", "gi"), "/gi#about");
  assert.equal(regionalizeHref("/privacy", "es"), "/privacy");
});
