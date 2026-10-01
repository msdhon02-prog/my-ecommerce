import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function CategoryGrid() {
  const cats = await getCategories();
  return (
    <section className="mx-4 mt-20 md:mx-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-plum">SHOP BY CATEGORY</p>
          <h2 className="font-display text-4xl md:text-5xl">Style for Every You</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold hover:text-plum">View All →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {cats.map((c: any) => (
          <Link key={c.id} href={"/shop?category=" + c.slug}
            className="group relative overflow-hidden rounded-card bg-mist p-10 transition hover:-translate-y-1 hover:shadow-2xl">
            <p className="text-xs tracking-[0.3em] text-plum">{c.tagline ?? ""}</p>
            <h3 className="font-display text-4xl">{c.name}</h3>
            <p className="mt-2 text-ink/60">{c._count.products} pieces</p>
            <span className="mt-6 inline-block rounded-pill bg-ink px-6 py-3 text-sm text-cream transition group-hover:bg-plum">
              Explore Now →
            </span>
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lilac/40 transition group-hover:scale-125" />
          </Link>
        ))}
      </div>
    </section>
  );
}
