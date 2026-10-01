import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-card bg-plum text-cream md:mx-10">
      <div className="grid items-center gap-10 px-8 py-16 md:grid-cols-2 md:px-16 md:py-24">
        <div className="animate-reveal">
          <p className="mb-6 text-xs tracking-[0.4em] text-lilac">OWN YOUR VIBE</p>
          <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">
            Bold Looks<br /><span className="text-lilac">Brighter</span><br />Days
          </h1>
          <p className="mt-6 max-w-md text-lg text-cream/80">
            Premium heavyweight tees for a smarter, bolder you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/shop" className="rounded-pill bg-cream px-8 py-4 font-semibold text-ink transition hover:scale-105">
              Shop Now →
            </Link>
            <Link href="/shop?category=limited-drop" className="rounded-pill border border-cream/40 px-8 py-4 transition hover:bg-cream/10">
              Explore Collection
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-10 text-sm text-cream/70">
            <span>🚚 Free Shipping over ৳3000</span><span>↩ Easy Returns</span><span>🛡 COD Available</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-card bg-gradient-to-br from-orchid via-plum to-ink grid place-items-center">
            <span className="font-display text-4xl text-cream/40 -rotate-6">DEMORA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
