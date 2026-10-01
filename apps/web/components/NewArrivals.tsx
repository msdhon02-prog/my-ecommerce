import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default async function NewArrivals() {
  const products = await getProducts({ new: "true" });
  if (!products.length) return null;
  return (
    <section className="mx-4 mt-24 md:mx-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-plum">NEW COLLECTION</p>
          <h2 className="font-display text-4xl md:text-5xl">Same Energy, New Arrivals</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.slice(0, 4).map((p: any) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
