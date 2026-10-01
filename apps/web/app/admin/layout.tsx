"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") { setReady(true); return; }
    if (!localStorage.getItem("demora-admin-token")) router.replace("/admin/login");
    else setReady(true);
  }, [pathname, router]);

  if (!ready) return null;
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="mx-auto mt-6 max-w-6xl px-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-pill bg-ink px-6 py-3 text-cream">
        <span className="font-display text-xl tracking-[0.2em]">DEMORA · ADMIN</span>
        <nav className="flex gap-6 text-sm">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? "text-lilac" : "hover:text-lilac"}>{n.label}</Link>
          ))}
          <button onClick={() => { localStorage.removeItem("demora-admin-token"); router.push("/admin/login"); }} className="text-cream/60 hover:text-cream">Logout</button>
        </nav>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
