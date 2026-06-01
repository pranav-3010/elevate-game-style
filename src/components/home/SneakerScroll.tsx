import { useEffect, useRef } from "react";

const specs = [
  ["01", "Court-bred silhouette",   "Reinforced heel cradle, leather mudguard"],
  ["02", "Vulcanised midsole",      "Crimson foam tooling for impact return"],
  ["03", "Bonded mesh upper",       "Featherweight, breathable, road-ready"],
];

export function SneakerScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      el.style.setProperty("--p", progress.toString());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background:
              "radial-gradient(circle at calc(20% + var(--p,0) * 60%) 50%, oklch(0.58 0.21 25 / 0.35), oklch(0.14 0 0) 60%)",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div className="order-2 lg:order-1">
            <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Featured silhouette</span>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] tracking-[0.02em] sm:text-7xl">
              Shadow<br />Runner 01.
            </h2>

            <div className="mt-8 space-y-5">
              {specs.map(([n, t, s], i) => (
                <div
                  key={n}
                  className="flex gap-5 border-t border-white/10 pt-5 transition-all duration-700"
                  style={{
                    opacity: `calc(min(1, max(0, var(--p,0) * 3 - ${i})))`,
                    transform: `translateY(calc((1 - min(1, max(0, var(--p,0) * 3 - ${i}))) * 20px))`,
                  }}
                >
                  <span className="font-display text-3xl text-primary">{n}</span>
                  <div>
                    <h4 className="font-display text-xl tracking-[0.04em]">{t}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="relative aspect-square w-full max-w-[520px]">
              <div
                className="absolute inset-0 rounded-full bg-primary/30 blur-3xl transition-all duration-700"
                style={{ transform: "scale(calc(0.6 + var(--p,0) * 0.6))" }}
              />
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85"
                alt="Shadow Runner 01"
                className="relative h-full w-full object-contain drop-shadow-[0_40px_60px_oklch(0_0_0_/_0.7)] transition-transform duration-700"
                style={{
                  transform:
                    "rotate(calc(var(--p,0) * 25deg - 5deg)) translateY(calc(var(--p,0) * -20px))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
