export function Newsletter() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,oklch(0.58_0.21_25/_0.35),transparent_55%)]" />
      <div className="mx-auto max-w-4xl px-5 py-28 text-center lg:px-8">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Inner circle</span>
        <h2 className="mt-4 font-display text-5xl tracking-[0.02em] sm:text-7xl">
          First in. Last sold out.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base text-foreground/75">
          Join the Commune for early access to drops, member-only sizing, and the occasional invite you can't refuse.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@theclub.com"
            className="flex-1 rounded-full border border-white/15 bg-transparent px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button className="rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90">
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
