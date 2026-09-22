import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="wordmark" aria-label="Shiel Accountants home">
      <span className="wordmark-main">SHIEL<span className="wordmark-dot" aria-hidden="true">.</span></span>
      <span className="wordmark-sub">ACCOUNTANTS</span>
    </Link>
  );
}
