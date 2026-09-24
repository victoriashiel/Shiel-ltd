"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { regionList, type RegionSlug } from "@/lib/regions";
import { regionalPathFor } from "@/lib/regional-routing";

type SuggestedRegion = {
  countryCode: string;
  region: RegionSlug;
  name: string;
  path: string;
};

function pathnameRegion(pathname: string) {
  const first = pathname.split("/").filter(Boolean)[0];
  return regionList.some((region) => region.slug === first) ? first : null;
}

export function RegionSuggestionBanner() {
  const pathname = usePathname();
  const [suggestion, setSuggestion] = useState<SuggestedRegion | null>(null);

  useEffect(() => {
    const existingChoice = localStorage.getItem("shiel-region-choice");
    if (existingChoice) return;

    const current = pathnameRegion(pathname);

    let cancelled = false;
    fetch("/api/region", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (
          cancelled ||
          !data?.region ||
          current === data.region
        ) return;

        setSuggestion(data as SuggestedRegion);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!suggestion) return null;

  const suggestionPath = regionalPathFor(pathname, suggestion.region);

  return (
    <div className="region-suggestion" role="status">
      <div className="region-suggestion-inner">
        <p>
          Visiting from <strong>{suggestion.name}</strong>?
          <Link
            href={suggestionPath}
            onClick={() => localStorage.setItem("shiel-region-choice", suggestion.region)}
          >
            View local services <span aria-hidden="true">→</span>
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss regional suggestion"
          onClick={() => {
            localStorage.setItem("shiel-region-choice", "dismissed");
            setSuggestion(null);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
