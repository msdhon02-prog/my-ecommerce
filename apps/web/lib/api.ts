const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getProducts(query: Record<string, string> = {}) {
  const qs = new URLSearchParams(query).toString();
  const res = await fetch(API + "/api/products?" + qs, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function getProduct(slug: string) {
  const res = await fetch(API + "/api/products/" + slug, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories() {
  const res = await fetch(API + "/api/categories", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
