import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-5 py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0a0a] p-10 sm:p-16 lg:p-24"
      >
        <div className="aurora" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">Inner circle</span>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            First in.<br />
            <span className="text-primary">Last sold out.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-foreground/75">
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
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-md focus:border-primary focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_20px_60px_-20px_rgba(255,0,46,0.7)] transition hover:bg-primary/90"
            >
              Join the commune
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </motion.button>
          </form>
          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-foreground/40">
            No spam. Unsubscribe with a single click.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
