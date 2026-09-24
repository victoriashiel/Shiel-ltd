"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { getActiveRegion } from "@/lib/regional-routing";
import { regions } from "@/lib/regions";

export function RegionAwareLogo() {
  const pathname = usePathname();
  const region = getActiveRegion(pathname);
  return <Logo href={region ? regions[region].path : "/"} />;
}
