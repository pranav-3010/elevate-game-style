import { Link } from "@tanstack/react-router";
import { limitedHandles, products, formatPrice } from "@/lib/catalog";

export function LimitedDrops() {
  const items = limitedHandles.map((h) => products.find((p) => p.handle === h)!).filter(Boolean);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-12">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Limited editions</span>
        <h2 className="mt-3 font-display text-5xl tracking-[0.02em] sm:text-6xl">Numbered. Counted. Gone.</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((p, i) => (
          <Link
            key={p.handle}
            to="/product/$handle"
            params={{ handle: p.handle }}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-card hover-lift"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute left-5 top-5 font-display text-5xl text-primary">0{i + 1}</div>
              <div className="absolute right-5 top-5 rounded-full border border-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground">
                300 pieces
              </div>
            </div>
            <div className="flex items-end justify-between p-6">
              <div>
                <h3 className="font-display text-2xl tracking-[0.04em]">{p.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{p.category}</p>
              </div>
              <span className="font-display text-2xl">{formatPrice(p)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
