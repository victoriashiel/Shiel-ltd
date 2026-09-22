import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="wordmark" aria-label="Shiel home">
      <span>SHIEL</span><span className="wordmark-dot" aria-hidden="true">.</span>
    </Link>
  );
}
