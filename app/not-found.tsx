import Link from "next/link";

export default function NotFound() {
  return <main className="page-intro shell"><p className="eyebrow">404</p><h1>That page could not be found.</h1><p>Return to the Nexoventa home page to continue.</p><Link className="text-link" href="/">Back home</Link></main>;
}
