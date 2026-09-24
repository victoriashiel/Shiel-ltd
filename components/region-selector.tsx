"use client";

import { usePathname, useRouter } from "next/navigation";
import { regionList, type RegionSlug } from "@/lib/regions";
import { regionalPathFor } from "@/lib/regional-routing";

function currentRegion(pathname: string): RegionSlug | "global" {
  const first = pathname.split("/").filter(Boolean)[0];
  return regionList.some((region) => region.slug === first) ? first as RegionSlug : "global";
}

export function RegionSelector({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const value = currentRegion(pathname);

  const active = value === "global"
    ? { name: "Global" }
    : regionList.find((region) => region.slug === value) ?? { name: "Global" };

  return (
    <label className={compact ? "region-selector region-selector-compact" : "region-selector"}>
      <span className={compact ? "region-selector-label" : "sr-only"}>
        {compact ? active.name : "Choose region"}
      </span>
      <select
        value={value}
        aria-label="Choose region"
        onChange={(event) => {
          const next = event.target.value as RegionSlug | "global";
          localStorage.setItem("shiel-region-choice", next);
          router.push(regionalPathFor(pathname, next));
        }}
      >
        <option value="global">Global</option>
        {regionList.map((region) => (
          <option key={region.slug} value={region.slug}>{region.name}</option>
        ))}
      </select>
    </label>
  );
}
