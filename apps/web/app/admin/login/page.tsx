"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch(API + "/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("demora-admin-token", token);
      router.push("/admin");
    } else setError("Invalid credentials");
  }

  return (
    <section className="mx-auto mt-24 max-w-sm">
      <h1 className="text-center font-display text-4xl">DEMORA Admin</h1>
      <form onSubmit={submit} className="mt-10 space-y-4 rounded-card bg-mist p-8">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 focus:outline-none focus:ring-2 focus:ring-plum" />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="w-full rounded-pill bg-ink py-4 font-semibold text-cream hover:bg-plum">Sign In →</button>
      </form>
    </section>
  );
}
