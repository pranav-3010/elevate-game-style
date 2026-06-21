import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
            alt="The Commune"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/80">Editorial · 04</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/80">Shot in Mumbai</span>
          </div>
        </motion.div>

        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.28em] text-primary"
          >
            Our story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-4 font-display text-6xl tracking-[-0.04em] sm:text-8xl"
          >
            The<br />
            <span className="text-primary">Commune.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-md text-base leading-relaxed text-foreground/75"
          >
            Born on the pitch. Built for the city. We design athletic-luxury for a generation that refuses to pick between sport and style — every piece is engineered, never decorated.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {[
              ["2019", "Founded"],
              ["42", "Countries"],
              ["1.2M", "Commune"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl tracking-tight">{n}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
