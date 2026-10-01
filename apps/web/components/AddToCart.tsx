"use client";
import { useState } from "react";

export default function AddToCart({ product }: { product: any }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  function add() {
    const cart = JSON.parse(localStorage.getItem("demora-cart") ?? "[]");
    const existing = cart.find((i: any) => i.productId === product.id && i.size === size);
    if (existing) existing.qty += 1;
    else cart.push({ productId: product.id, slug: product.slug, name: product.name, price: Number(product.price), image: product.images[0], size, qty: 1 });
    localStorage.setItem("demora-cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-8">
      <p className="mb-3 text-sm font-semibold">Size</p>
      <div className="flex gap-2">
        {product.sizes.map((s: string) => (
          <button key={s} onClick={() => setSize(s)}
            className={"h-11 w-11 rounded-full border text-sm transition " + (size === s ? "border-ink bg-ink text-cream" : "border-ink/20 hover:border-ink")}>
            {s}
          </button>
        ))}
      </div>
      <button onClick={add}
        className={"mt-8 w-full rounded-pill py-4 font-semibold text-cream transition md:w-auto md:px-12 " + (added ? "bg-orchid" : "bg-ink hover:bg-plum")}>
        {added ? "Added ✓" : "Add to Cart →"}
      </button>
    </div>
  );
}
