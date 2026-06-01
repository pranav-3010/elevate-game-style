import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — One8 Commune" },
      { name: "description", content: "Shop the full One8 Commune catalog — athletic luxury for men and women." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-12">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">All collections</span>
        <h1 className="mt-3 font-display text-6xl tracking-[0.02em] sm:text-8xl">The Shop.</h1>
        <p className="mt-4 max-w-xl text-base text-foreground/75">Every silhouette in rotation, from court-bred sneakers to engineered tailoring.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => <ProductCard key={p.handle} product={p} />)}
      </div>
    </div>
  );
}
