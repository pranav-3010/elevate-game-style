import { createFileRoute } from "@tanstack/react-router";

const feed = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80", tag: "Training" },
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80", tag: "Street" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80", tag: "Wrist" },
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80", tag: "On foot" },
  { src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=80", tag: "Fit" },
  { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80", tag: "Gym" },
];

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — One8 Commune" },
      { name: "description", content: "The Commune. Styled by you, on the feed." },
    ],
  }),
  component: Community,
});

function Community() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-12 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Styled by you</span>
          <h1 className="mt-3 font-display text-6xl leading-[0.95] tracking-[0.02em] sm:text-8xl">The feed.</h1>
        </div>
        <p className="text-base text-foreground/75">Tag <span className="text-foreground">@one8commune</span> for a chance to be featured. We repost weekly.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {feed.map((f, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-card">
            <img src={f.src} alt={f.tag} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-foreground">{f.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
