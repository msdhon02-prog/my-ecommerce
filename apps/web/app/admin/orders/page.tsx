"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const auth = () => ({ Authorization: "Bearer " + localStorage.getItem("demora-admin-token") });
const STATUSES = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch(API + "/api/admin/orders", { headers: auth() }).then((r) => r.json()).then(setOrders);
  }, []);

  async function setStatus(id: string, status: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch(API + "/api/admin/orders/" + id + "/status", {
      method: "PUT", headers: { ...auth(), "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
  }

  return (
    <>
      <h1 className="font-display text-4xl">Orders</h1>
      <ul className="mt-8 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl bg-mist p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{o.number} · ৳{Number(o.total)}</p>
                <p className="text-sm text-ink/50">{o.customerName} — {o.phone} — {o.city} · {o.paymentMethod} · {new Date(o.createdAt).toLocaleDateString()}</p>
              </div>
              <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}
                className={"rounded-xl border border-ink/10 px-3 py-2 font-semibold " + (o.status === "DELIVERED" ? "bg-green-100" : o.status === "CANCELLED" ? "bg-red-100" : "bg-white")}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-ink/60">
              {o.items.map((i: any) => (
                <li key={i.id}>{i.product?.name} · Size {i.size} × {i.qty} — ৳{Number(i.price) * i.qty}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-ink/40">{o.address}</p>
          </li>
        ))}
        {!orders.length && <p className="text-ink/50">No orders yet.</p>}
      </ul>
    </>
  );
}
