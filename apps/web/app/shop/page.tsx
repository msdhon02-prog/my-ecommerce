import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getProducts(searchParams.category ? { category: searchParams.category } : {});
  return (
    <section className="mx-4 mt-10 md:mx-10">
      <p className="text-xs tracking-[0.3em] text-plum">SHOP</p>
      <h1 className="font-display text-5xl md:text-6xl">All Products</h1>
      <p className="mt-2 text-ink/50">{products.length} pieces</p>
      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((p: any) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
