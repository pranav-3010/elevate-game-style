import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — One8 Commune" },
      { name: "description", content: "Athletic luxury, built for the modern game. Our story." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative isolate min-h-[60vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=2400&q=80" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-24 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Est. Season 01</span>
          <h1 className="mt-3 font-display text-7xl leading-[0.9] tracking-[0.02em] sm:text-9xl">The Commune.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 lg:px-8 lg:grid-cols-2 lg:gap-16">
        <p className="font-display text-3xl leading-tight tracking-[0.02em]">
          We make clothes for people who train hard, dress sharp, and don't want to choose between the two.
        </p>
        <div className="space-y-5 text-base leading-relaxed text-foreground/80">
          <p>One8 Commune is an athletic luxury label inspired by sport and shaped by the street. Every silhouette starts in a training room and finishes in a finishing studio — then gets cut, sewn and quality-checked in small batches.</p>
          <p>Our materials are tested under load: technical nylons that survive the gym bag, leathers that age into character, knits that hold shape after the hundredth wash. Nothing ships unless we'd wear it ourselves.</p>
          <p>If it doesn't make you move better, look sharper, or feel more like yourself — it doesn't belong in the collection.</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-obsidian">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-16 sm:grid-cols-4 lg:px-8">
          {[["04", "Seasons"], ["62", "Silhouettes"], ["12", "Atelier partners"], ["48h", "Express delivery"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-5xl text-primary">{n}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
