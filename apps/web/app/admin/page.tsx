"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(API + "/api/admin/stats", { headers: { Authorization: "Bearer " + localStorage.getItem("demora-admin-token") } })
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats);
  }, []);

  if (!stats) return <p className="text-ink/50">Loading…</p>;

  const cards = [
    { label: "Products", value: stats.products },
    { label: "Orders", value: stats.orders },
    { label: "Revenue (৳)", value: stats.revenue },
    { label: "Subscribers", value: stats.subscribers },
    { label: "Low Stock (<10)", value: stats.lowStock },
  ];

  return (
    <>
      <h1 className="font-display text-4xl">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-card bg-mist p-6">
            <p className="text-sm text-ink/50">{c.label}</p>
            <p className="mt-2 font-display text-3xl">{c.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
