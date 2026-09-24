"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { regionList, type RegionSlug } from "@/lib/regions";

function pathnameRegion(pathname: string): RegionSlug | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return regionList.some((region) => region.slug === first) ? first as RegionSlug : null;
}

export function RegionAwarePackagesLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const region = pathnameRegion(pathname);
  const href = region ? `/${region}#regional-packages` : "/packages";

  return (
    <Link className={className} href={href} onClick={onNavigate}>
      Packages
    </Link>
  );
}
