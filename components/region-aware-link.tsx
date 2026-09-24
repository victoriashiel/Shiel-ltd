"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getActiveRegion, regionalizeHref } from "@/lib/regional-routing";

export function RegionAwareLink({
  href,
  children,
  className,
  onClick,
  ...props
}: LinkProps & {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const region = getActiveRegion(pathname);
  const regionalHref = regionalizeHref(href, region);
  const isCurrent =
    pathname === regionalHref ||
    (regionalHref !== "/" && pathname.startsWith(`${regionalHref}/`));

  return (
    <Link
      href={regionalHref}
      className={className}
      onClick={onClick}
      aria-current={isCurrent ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
