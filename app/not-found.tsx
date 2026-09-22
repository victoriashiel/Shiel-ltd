import Link from "next/link";

export default function NotFound() {
  return <section className="not-found section-pad"><p className="eyebrow">404</p><h1>That page is not here.</h1><p>The address may have changed, or the page may never have existed.</p><Link className="button button-dark" href="/">Back to home</Link></section>;
}
