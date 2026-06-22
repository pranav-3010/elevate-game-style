import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/catalog";

// Bento layout: variable sizes
const layoutClasses = [
  "lg:col-span-2 lg:row-span-2", // 0 — hero
  "lg:col-span-2",               // 1
  "",                            // 2
  "",                            // 3
  "lg:col-span-2",               // 4
  "",                            // 5
  "",                            // 6
  "lg:col-span-2",               // 7
  "",                            // 8
  "lg:col-span-2",               // 9
];

export function CategoryGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-32 lg:px-8">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Shop the universe</span>
          <h2 className="mt-4 font-display text-5xl tracking-[-0.03em] sm:text-7xl">
            Nine ways<br />to suit up.
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden rounded-full border border-white/15 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition hover:border-primary hover:text-primary sm:inline-flex"
        >
          View all →
        </Link>
      </div>

      <div className="grid auto-rows-[260px] grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[280px] lg:grid-cols-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            className={layoutClasses[i] ?? ""}
          >
            <Link
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-card hover-lift"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-transparent to-primary/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:from-primary/20" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-7">
                <div>
                  <h3 className={`font-display tracking-[-0.02em] ${i === 0 ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"}`}>
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-foreground/70 transition-all duration-500 group-hover:text-primary">
                    {c.tagline}
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-md transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
