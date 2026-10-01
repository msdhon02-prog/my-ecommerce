import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) return <p className="mx-10 mt-20">Product not found.</p>;
  return (
    <section className="mx-4 mt-10 grid gap-12 md:mx-10 md:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mist">
        <Image src={p.images[0]} alt={p.name} fill className="object-cover" priority />
      </div>
      <div>
        <p className="text-xs tracking-[0.3em] text-plum">{p.category?.name?.toUpperCase()}</p>
        <h1 className="mt-2 font-display text-5xl">{p.name}</h1>
        <p className="mt-4 text-3xl font-semibold text-plum">৳{Number(p.price)}</p>
        <p className="mt-6 leading-relaxed text-ink/70">{p.description}</p>
        <AddToCart product={p} />
        <div className="mt-10 flex gap-8 text-sm text-ink/60">
          <span>🚚 Free Shipping over ৳3000</span><span>↩ Easy Returns</span><span>🛡 COD Available</span>
        </div>
      </div>
    </section>
  );
}
