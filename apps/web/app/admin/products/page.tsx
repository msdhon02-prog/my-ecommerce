"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const auth = () => ({ Authorization: "Bearer " + localStorage.getItem("demora-admin-token") });

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(API + "/api/admin/products", { headers: auth() }).then((r) => r.json()).then(setProducts);
  }, []);

  async function saveOrder(next: any[]) {
    setProducts(next);
    await fetch(API + "/api/admin/products/reorder", {
      method: "PUT",
      headers: { ...auth(), "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((p) => p.id) }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function update(id: string, data: any) {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
    await fetch(API + "/api/admin/products/" + id, { method: "PUT", headers: { ...auth(), "Content-Type": "application/json" }, body: JSON.stringify(data) });
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(API + "/api/admin/products/" + id, { method: "DELETE", headers: auth() });
    setProducts(products.filter((p) => p.id !== id));
  }

  function onDrop(target: number) {
    if (dragIdx === null || dragIdx === target) return;
    const next = [...products];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(target, 0, moved);
    saveOrder(next);
    setDragIdx(null);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Products</h1>
        <span className={"text-sm " + (saved ? "text-green-600" : "text-ink/30")}>{saved ? "Order saved ✓" : "Drag rows to reorder"}</span>
      </div>
      <ul className="mt-8 space-y-2">
        {products.map((p, i) => (
          <li key={p.id} draggable onDragStart={() => setDragIdx(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(i)}
            className={"flex cursor-grab flex-wrap items-center gap-4 rounded-2xl bg-mist px-5 py-4 transition " + (dragIdx === i ? "opacity-40" : "")}>
            <span className="w-8 text-center text-ink/40">⠿</span>
            <span className="w-6 font-semibold text-ink/40">{i + 1}</span>
            <div className="min-w-40 flex-1">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-ink/50">{p.category?.name}</p>
            </div>
            <span className="w-20 font-semibold text-plum">৳{Number(p.price)}</span>
            <label className="flex items-center gap-2 text-sm text-ink/60">Stock
              <input type="number" value={p.stock} onChange={(e) => update(p.id, { stock: Number(e.target.value) })}
                className="w-20 rounded-xl border border-ink/10 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plum" />
            </label>
            <select value={p.status} onChange={(e) => update(p.id, { status: e.target.value })}
              className="rounded-xl border border-ink/10 bg-white px-3 py-2">
              <option>ACTIVE</option><option>DRAFT</option><option>ARCHIVED</option>
            </select>
            <button onClick={() => remove(p.id)} className="text-ink/40 hover:text-red-500">✕</button>
          </li>
        ))}
      </ul>
    </>
  );
}
