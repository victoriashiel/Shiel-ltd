"use client";

import { usePathname } from "next/navigation";
import { getActiveRegion } from "@/lib/regional-routing";
import { regions } from "@/lib/regions";

export function RegionalFooterContext() {
  const pathname = usePathname();
  const region = getActiveRegion(pathname);

  return (
    <p>
      {region ? `${regions[region].name} site · Working internationally` : "European based · Working internationally"}
    </p>
  );
}
