export function Marquee({ items }: { items: string[] }) {
  const all = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-background py-5">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl tracking-[0.25em] text-foreground/80">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
