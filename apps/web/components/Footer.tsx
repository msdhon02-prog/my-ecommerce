import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 rounded-t-card bg-ink px-8 py-16 text-cream md:px-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-3xl tracking-[0.2em]">DEMORA</h3>
          <p className="mt-3 text-cream/60">More than fashion.</p>
        </div>
        {[
          { h: "Shop", items: ["Oversized Tees", "Graphic Tees", "Essentials", "Limited Drop"] },
          { h: "Help", items: ["Track Order", "Returns", "Shipping", "Size Guide", "FAQs"] },
          { h: "Company", items: ["About Us", "Our Story", "Sustainability", "Careers", "Press"] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="mb-4 font-semibold">{col.h}</h4>
            <ul className="space-y-2 text-cream/60">
              {col.items.map((i) => <li key={i}><Link href="#" className="hover:text-lilac">{i}</Link></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-14 text-sm text-cream/40">© 2025 DEMORA. All rights reserved. · Terms · Privacy · Cookies</p>
    </footer>
  );
}
