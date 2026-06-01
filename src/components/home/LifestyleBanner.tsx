const tiles = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80", label: "Gym Floor" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80", label: "Timepieces" },
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80", label: "Street" },
];

export function LifestyleBanner() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/10 bg-obsidian">
      <div className="mx-auto grid max-w-7xl gap-1 px-0 py-0 sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="group relative aspect-[3/4] overflow-hidden bg-background">
            <img
              src={t.src}
              alt={t.label}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition-all duration-[1400ms] group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute left-6 top-6 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <h2 className="font-display text-5xl leading-[0.95] tracking-[0.02em] sm:text-7xl">
            Built for the<br />
            <span className="text-primary">off-pitch</span> hours.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-foreground/75">
            Training kits that work in the gym and look right in the lobby. Watches that close a deal. Sneakers that survive a marathon weekend. One8 Commune dresses the modern athlete from sunrise to last call.
          </p>
        </div>
      </div>
    </section>
  );
}
