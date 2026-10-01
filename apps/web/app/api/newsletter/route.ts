import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const res = await fetch((process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000") + "/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
