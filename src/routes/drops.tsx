import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { limitedHandles, products } from "@/lib/catalog";

export const Route = createFileRoute("/drops")({
  head: () => ({
    meta: [
      { title: "Limited Drops — One8 Commune" },
      { name: "description", content: "Numbered, limited editions. Once they're gone, they're gone." },
    ],
  }),
  component: Drops,
});

function Drops() {
  const items = limitedHandles.map((h) => products.find((p) => p.handle === h)!).filter(Boolean);
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Limited editions</span>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] tracking-[0.02em] sm:text-8xl">The Drops.</h1>
        </div>
        <p className="text-base leading-relaxed text-foreground/75">
          Capsules built in small runs with our atelier partners. Numbered, traceable, and once sold — never reproduced.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProductCard key={p.handle} product={p} />)}
      </div>
    </div>
  );
}
