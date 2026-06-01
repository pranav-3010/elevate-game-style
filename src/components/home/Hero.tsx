import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="grain relative isolate min-h-[92vh] overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.58_0.21_25/_0.25),transparent_55%)]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-5 pb-14 pt-16 lg:px-8 lg:pt-24">
        <div className="reveal-up max-w-2xl">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Season 04 · Live
          </span>
          <h1 className="mt-6 font-display text-[clamp(4rem,11vw,11rem)] leading-[0.85] tracking-[0.01em]">
            OWN<br />
            THE <span className="text-primary">GAME</span>.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80">
            Athletic luxury, sharpened. A new wardrobe of sneakers, tailoring and gear engineered for those who play harder off the field.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/drops"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90"
            >
              Shop the drop
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/category/sneakers"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Play className="h-3.5 w-3.5" /> Explore Sneakers
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            ["09", "Categories"],
            ["300", "Pairs / Drop"],
            ["48h", "Express Ship"],
            ["100%", "Authentic"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl text-foreground">{n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
