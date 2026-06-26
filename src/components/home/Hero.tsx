import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const headingLines = ["OWN", "THE", "GAME."];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useTransform(mx, (v) => v * 18);
  const py = useTransform(my, (v) => v * 18);
  const pxImg = useTransform(mx, (v) => v * -28);
  const pyImg = useTransform(my, (v) => v * -28);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mx.set(x); my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section className="grain relative isolate min-h-screen overflow-hidden">
      <div className="aurora" />
      {/* background */}
      <motion.div className="absolute inset-0 -z-10" style={{ x: pxImg, y: pyImg, scale: 1.08 }}>
        <img
          src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,0,46,0.30),transparent_55%)]" />
      </motion.div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-5 pb-14 pt-28 lg:px-8 lg:pt-32">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            Season 04 · Live worldwide
          </motion.span>

          <motion.h1
            style={{ x: px, y: py }}
            className="mt-8 font-display text-[clamp(4.5rem,13vw,13rem)] font-bold leading-[0.82] tracking-[-0.04em]"
          >
            {headingLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
                className="block overflow-hidden"
              >
                <span className="inline-block">
                  {line === "GAME." ? (
                    <>
                      <span className="text-primary">G</span>AME<span className="text-primary">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-md text-base leading-relaxed text-foreground/75"
          >
            Athletic luxury, sharpened. A new wardrobe of sneakers, tailoring and gear engineered for those who play harder off the field.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                to="/drops"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_20px_60px_-20px_rgba(255,0,46,0.7)] transition hover:bg-primary/90"
              >
                Shop the drop
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/category/$slug"
                params={{ slug: "sneakers" }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <Play className="h-3.5 w-3.5" /> Explore Sneakers
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="pointer-events-none mt-12 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="floaty pointer-events-auto absolute right-8 top-32 hidden w-56 rounded-3xl glass-card p-5 lg:block"
          >
            <div className="text-[10px] uppercase tracking-[0.28em] text-primary">Live drop</div>
            <div className="mt-2 font-display text-3xl">Crimson Court</div>
            <div className="mt-1 text-xs text-muted-foreground">300 pairs · 87% claimed</div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[87%] rounded-full bg-primary" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="floaty pointer-events-auto absolute right-24 top-[55%] hidden w-48 rounded-3xl glass-card p-5 lg:block"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="text-[10px] uppercase tracking-[0.28em] text-foreground/60">Ships in</div>
            <div className="mt-2 font-display text-4xl">48<span className="text-primary">h</span></div>
            <div className="mt-1 text-xs text-muted-foreground">Express worldwide</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {[
            ["09", "Categories"],
            ["300", "Pairs / Drop"],
            ["48h", "Express Ship"],
            ["100%", "Authentic"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl tracking-tight">{n}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <div className="text-[10px] uppercase tracking-[0.32em] text-foreground/50">Scroll</div>
        <div className="relative h-10 w-5 rounded-full border border-white/20">
          <span className="scroll-dot absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
