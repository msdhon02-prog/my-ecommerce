"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { productId: string; slug: string; name: string; price: number; image: string; size: string; qty: number };

export default function CartPage() {
  const [cart, setCart] = useState<Item[]>([]);
  useEffect(() => setCart(JSON.parse(localStorage.getItem("demora-cart") ?? "[]")), []);

  function save(next: Item[]) {
    setCart(next);
    localStorage.setItem("demora-cart", JSON.stringify(next));
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (!cart.length) return (
    <section className="mx-auto mt-24 max-w-md text-center">
      <h1 className="font-display text-5xl">Your cart is empty</h1>
      <Link href="/shop" className="mt-8 inline-block rounded-pill bg-ink px-10 py-4 font-semibold text-cream">Shop Now →</Link>
    </section>
  );

  return (
    <section className="mx-auto mt-10 max-w-4xl px-4">
      <h1 className="font-display text-5xl">Cart</h1>
      <ul className="mt-10 space-y-4">
        {cart.map((i) => (
          <li key={i.productId + i.size} className="flex items-center gap-5 rounded-card bg-mist p-4">
            <div className="relative h-24 w-20 overflow-hidden rounded-2xl">
              <Image src={i.image} alt={i.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <Link href={"/product/" + i.slug} className="font-semibold hover:text-plum">{i.name}</Link>
              <p className="text-sm text-ink/50">Size {i.size}</p>
              <p className="mt-1 font-semibold text-plum">৳{i.price * i.qty}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => save(cart.map((c) => c === i ? { ...c, qty: Math.max(1, c.qty - 1) } : c))} className="h-9 w-9 rounded-full border border-ink/20">−</button>
              <span className="w-6 text-center font-semibold">{i.qty}</span>
              <button onClick={() => save(cart.map((c) => c === i ? { ...c, qty: c.qty + 1 } : c))} className="h-9 w-9 rounded-full border border-ink/20">+</button>
              <button onClick={() => save(cart.filter((c) => c !== i))} className="ml-2 text-ink/40 hover:text-red-500" aria-label="Remove">✕</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between rounded-card bg-ink px-8 py-6 text-cream">
        <p className="text-lg">Total <span className="font-semibold">৳{total}</span></p>
        <Link href="/checkout" className="rounded-pill bg-cream px-8 py-3 font-semibold text-ink transition hover:scale-105">Checkout →</Link>
      </div>
    </section>
  );
}
