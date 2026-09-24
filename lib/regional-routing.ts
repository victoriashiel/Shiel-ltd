import { isRegionSlug, regions, type RegionSlug } from "@/lib/regions";

export const regionalPageSuffixes = [
  "/",
  "/tax-compliance",
  "/bookkeeping-payroll",
  "/advisory-growth",
  "/international-accounting",
  "/packages",
  "/contact",
] as const;

export type RegionalPageSuffix = (typeof regionalPageSuffixes)[number];

export function getActiveRegion(pathname: string): RegionSlug | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isRegionSlug(first) ? first : null;
}

export function stripRegionPrefix(pathname: string) {
  const region = getActiveRegion(pathname);
  if (!region) return pathname || "/";

  const prefix = regions[region].path;
  const stripped = pathname.slice(prefix.length);
  return stripped || "/";
}

export function isMirroredRegionalPath(pathname: string): pathname is RegionalPageSuffix {
  return regionalPageSuffixes.includes(pathname as RegionalPageSuffix);
}

export function regionalPathFor(
  pathname: string,
  target: RegionSlug | "global",
) {
  const suffix = stripRegionPrefix(pathname);

  if (target === "global") {
    return isMirroredRegionalPath(suffix) ? suffix : "/";
  }

  const base = regions[target].path;
  return isMirroredRegionalPath(suffix)
    ? suffix === "/" ? base : `${base}${suffix}`
    : base;
}

export function regionalizeHref(href: string, activeRegion: RegionSlug | null) {
  if (!activeRegion || !isMirroredRegionalPath(href)) return href;
  const base = regions[activeRegion].path;
  return href === "/" ? base : `${base}${href}`;
}
