"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import styles from "./mobile-navigation.module.css";

type Group = { label: string; items: readonly { label: string; href: string }[] };
const tabs = [
  { label: "Home", href: "/", path: "M3 10 12 3l9 7v11h-6v-7H9v7H3Z" },
  { label: "Services", href: "/#services", path: "M4 4h6v6H4Zm10 0h6v6h-6ZM4 14h6v6H4Zm10 0h6v6h-6Z" },
  { label: "Contact", href: "/contact", path: "M4 4h16v12H9l-5 5Z" },
  { label: "Packages", href: "/packages", path: "M4 6h16v15H4Zm4 0V3h8v3M4 11h16" },
];

export function MobileNavigation({ groups }: { groups: readonly Group[] }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const savedOverflow = useRef("");
  useEffect(() => {
    const panel = dialog.current;
    const media = window.matchMedia("(min-width: 781px)");
    const resize = () => { if (media.matches) panel?.close(); };
    media.addEventListener("change", resize);
    return () => {
      media.removeEventListener("change", resize);
      if (panel?.open) document.body.style.overflow = savedOverflow.current;
    };
  }, []);
  function show() {
    setQuery("");
    savedOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    setOpen(true);
  }
  function close() { dialog.current?.close(); }
  function onClose() {
    document.body.style.overflow = savedOverflow.current;
    setOpen(false);
  }
  const filtered = groups.map(group => ({ ...group, items: group.items.filter(item => `${group.label} ${item.label}`.toLowerCase().includes(query.trim().toLowerCase())) }));
  return (
    <div className={styles.mobile}>
      <button className={styles.trigger} type="button" onClick={show} aria-haspopup="dialog" aria-expanded={open} aria-controls="shiel-more">Menu <span aria-hidden="true">☰</span></button>
      <nav className={styles.bar} aria-label="Mobile primary navigation">
        {tabs.map((tab, index) => {
          const current = index === 1 ? groups[0].items.some(item => pathname === item.href) : pathname === tab.href || (tab.href === "/packages" && pathname.startsWith("/packages/"));
          return <Link key={tab.label} href={tab.href} aria-current={current ? "page" : undefined}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d={tab.path} /></svg><span>{tab.label}</span></Link>;
        })}
        <button type="button" onClick={show} aria-haspopup="dialog" aria-expanded={open} aria-controls="shiel-more"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg><span>More</span></button>
      </nav>
      <dialog ref={dialog} id="shiel-more" className={styles.sheet} aria-labelledby="shiel-menu-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        <div className={styles.sheetHeader}><div><p>SHIEL ACCOUNTANTS</p><h2 id="shiel-menu-title">How can we help?</h2></div><button type="button" onClick={close} aria-label="Close menu">×</button></div>
        <label className={styles.search}><span>Find a service, country or team</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Shiel…" /></label>
        <nav className={styles.links} aria-label="Explore Shiel">
          {filtered.map(group => group.items.length > 0 && <section key={group.label}><h3>{group.label}</h3>{group.items.map(item => <Link href={item.href} key={item.href} onClick={close} aria-current={pathname === item.href ? "page" : undefined}>{item.label}<span aria-hidden="true">↗</span></Link>)}</section>)}
          {filtered.every(group => !group.items.length) && <p role="status">No matches. Try “tax”, “Ireland” or “team”.</p>}
        </nav>
        <a className={styles.whatsapp} href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" onClick={close}>Chat on WhatsApp <span aria-hidden="true">↗</span></a>
      </dialog>
    </div>
  );
}
