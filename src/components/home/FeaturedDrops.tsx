import { Link } from "@tanstack/react-router";
import { products, featuredHandles } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export function FeaturedDrops() {
  const items = featuredHandles.map((h) => products.find((p) => p.handle === h)!).filter(Boolean);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Featured drops</span>
          <h2 className="mt-3 font-display text-5xl tracking-[0.02em] sm:text-6xl">In rotation now.</h2>
        </div>
        <Link to="/drops" className="text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground">
          See all drops →
        </Link>
      </div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {items.map((p) => (
          <div key={p.handle} className="w-[78%] flex-shrink-0 snap-start lg:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
