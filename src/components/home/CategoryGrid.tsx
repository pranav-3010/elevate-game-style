import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/catalog";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Shop the universe</span>
          <h2 className="mt-3 font-display text-5xl tracking-[0.02em] sm:text-6xl">Nine ways to suit up.</h2>
        </div>
        <Link to="/shop" className="hidden text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground sm:inline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className={`group relative overflow-hidden rounded-lg border border-white/10 bg-card ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div className={`relative ${i === 0 ? "aspect-[16/14]" : "aspect-[4/5]"} overflow-hidden`}>
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-7">
              <div>
                <h3 className={`font-display tracking-[0.04em] ${i === 0 ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"}`}>
                  {c.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-foreground/70">{c.tagline}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-foreground transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
