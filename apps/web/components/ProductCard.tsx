"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ p }: { p: any }) {
  return (
    <Link href={"/product/" + p.slug} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-mist">
        <Image src={p.images[0]} alt={p.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
        {p.isNew && <span className="absolute left-4 top-4 rounded-pill bg-ink px-3 py-1 text-xs text-cream">NEW</span>}
      </div>
      <div className="mt-4 flex items-start justify-between px-1">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-ink/50">{p.category?.name}</p>
        </div>
        <p className="font-semibold text-plum">৳{Number(p.price)}</p>
      </div>
    </Link>
  );
}
