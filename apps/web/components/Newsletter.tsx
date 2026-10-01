"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setDone(true);
  }

  return (
    <section id="newsletter" className="mx-4 mt-24 rounded-card bg-ink px-8 py-16 text-center text-cream md:mx-10 md:py-24">
      <h2 className="font-display text-4xl md:text-6xl">Join the DEMORA Circle</h2>
      <p className="mx-auto mt-4 max-w-md text-cream/70">Get early access, exclusive drops and style inspiration.</p>
      {done ? (
        <p className="mt-10 text-lilac">Welcome to the circle. ✨</p>
      ) : (
        <form onSubmit={subscribe} className="mx-auto mt-10 flex max-w-md gap-2 rounded-pill bg-plum/40 p-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-pill bg-transparent px-5 py-3 text-cream placeholder:text-cream/50 focus:outline-none" />
          <button className="shrink-0 rounded-pill bg-cream px-6 py-3 font-semibold text-ink">Subscribe →</button>
        </form>
      )}
    </section>
  );
}
