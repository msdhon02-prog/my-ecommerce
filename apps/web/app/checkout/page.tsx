"use client";
import { useEffect, useState } from "react";

type Item = { productId: string; name: string; price: number; size: string; qty: number; image: string };

export default function CheckoutPage() {
  const [cart, setCart] = useState<Item[]>([]);
  const [payment, setPayment] = useState("COD");
  const [placed, setPlaced] = useState<any>(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("demora-cart") ?? "[]"));
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 120;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: fd.get("name"), phone: fd.get("phone"), email: fd.get("email"),
        address: fd.get("address"), city: fd.get("city"), paymentMethod: payment,
        items: cart.map((i) => ({ productId: i.productId, size: i.size, qty: i.qty })),
      }),
    });
    if (res.ok) {
      localStorage.removeItem("demora-cart");
      setPlaced(await res.json());
    }
  }

  if (placed) return (
    <section className="mx-auto mt-20 max-w-lg text-center">
      <h1 className="font-display text-5xl">Order Placed 🎉</h1>
      <p className="mt-4 text-ink/60">Order <strong>{placed.number}</strong> · {placed.paymentMethod === "COD" ? "Pay on delivery" : "Payment pending"}</p>
    </section>
  );

  return (
    <section className="mx-auto mt-10 max-w-5xl px-4">
      <h1 className="font-display text-5xl">Checkout</h1>
      <form onSubmit={submit} className="mt-10 grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <input name="name" required placeholder="Full name" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
          <input name="phone" required placeholder="Phone" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
          <input name="email" type="email" placeholder="Email (optional)" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
          <textarea name="address" required placeholder="Full address" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
          <input name="city" required placeholder="City" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
        </div>
        <div>
          <div className="rounded-card bg-mist p-8">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {cart.map((i) => (
                <li key={i.productId + i.size} className="flex justify-between">
                  <span>{i.name} · {i.size} × {i.qty}</span><span>৳{i.price * i.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-ink/10 pt-4 text-sm">
              <p className="flex justify-between"><span>Subtotal</span><span>৳{subtotal}</span></p>
              <p className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : "৳" + shipping}</span></p>
              <p className="flex justify-between text-lg font-semibold"><span>Total</span><span>৳{subtotal + shipping}</span></p>
            </div>
            <h3 className="mb-3 mt-8 font-semibold">Payment Method</h3>
            <div className="space-y-2">
              {["COD", "CARD", "MOBILE_BANKING"].map((m) => (
                <label key={m} className={"flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition " + (payment === m ? "border-plum bg-white" : "border-ink/10")}>
                  <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} />
                  <span className="font-semibold">{m === "COD" ? "Cash on Delivery" : m === "CARD" ? "Card / Stripe" : "bKash / Nagad"}</span>
                </label>
              ))}
            </div>
            <button disabled={!cart.length} className="mt-8 w-full rounded-pill bg-ink py-4 font-semibold text-cream transition hover:bg-plum disabled:opacity-40">
              Place Order →
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
