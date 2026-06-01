import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — One8 Commune" },
      { name: "description", content: "Curated capsules and seasonal collections from One8 Commune." },
    ],
  }),
  component: Collections,
});

const collections = [
  { slug: "sneakers", name: "Court Series",   tag: "08 pieces", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80" },
  { slug: "men",      name: "Black Capsule",  tag: "14 pieces", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=80" },
  { slug: "gym",      name: "Training Lab",   tag: "11 pieces", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80" },
  { slug: "watches",  name: "Atelier Time",   tag: "06 pieces", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1400&q=80" },
];

function Collections() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-12">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Curated capsules</span>
        <h1 className="mt-3 font-display text-6xl tracking-[0.02em] sm:text-8xl">Collections.</h1>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        {collections.map((c, i) => (
          <Link
            key={c.name}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className={`group relative overflow-hidden rounded-lg border border-white/10 bg-card hover-lift ${i % 3 === 0 ? "lg:aspect-[16/12]" : "lg:aspect-[16/10]"}`}
          >
            <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8">
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/70">{c.tag}</span>
              <h3 className="mt-2 font-display text-5xl tracking-[0.02em] sm:text-6xl">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
