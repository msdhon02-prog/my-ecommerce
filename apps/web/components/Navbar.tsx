"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=oversized-tees", label: "Oversized" },
  { href: "/shop?category=graphic-tees", label: "Graphics" },
  { href: "/shop?category=limited-drop", label: "Drops" },
  { href: "/#newsletter", label: "Journal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 mx-4 mt-4 rounded-pill bg-ink/90 text-cream backdrop-blur md:mx-10">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-display text-2xl tracking-[0.25em]">DEMORA</Link>
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition hover:text-lilac">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          <Link href="/cart" aria-label="Cart">🛍</Link>
          <Link href="/admin" aria-label="Admin" className="text-cream/50 hover:text-cream">⚙</Link>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-3 px-6 pb-6 md:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
