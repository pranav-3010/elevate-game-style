import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Arjun M.", role: "Footballer · Mumbai", quote: "Fits like it was tailored on me. The Crimson Court is the best sneaker I've owned in years.", avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Sana K.", role: "Creative Director · Berlin", quote: "Finally a brand that takes both performance and silhouette seriously. Quiet luxury, loud confidence.", avatar: "https://i.pravatar.cc/120?img=47" },
  { name: "Devon R.", role: "Athlete · NYC", quote: "Shipping was 48h to Brooklyn. Stitching, weight, finish — it competes with anything in my closet.", avatar: "https://i.pravatar.cc/120?img=33" },
  { name: "Priya S.", role: "Architect · Bangalore", quote: "The Black Capsule is a wardrobe reset. Considered, restrained, beautifully made.", avatar: "https://i.pravatar.cc/120?img=23" },
  { name: "Marco T.", role: "DJ · Milan", quote: "Every drop sells out for a reason. They get the details right that other brands skip.", avatar: "https://i.pravatar.cc/120?img=58" },
  { name: "Aisha B.", role: "Designer · London", quote: "One8 Commune is the closest thing to ALD with a performance edge. I'm fully in.", avatar: "https://i.pravatar.cc/120?img=44" },
];

const loop = [...testimonials, ...testimonials];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto mb-14 max-w-7xl px-5 lg:px-8">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">The Commune speaks</span>
        <h2 className="mt-4 max-w-3xl font-display text-5xl tracking-[-0.03em] sm:text-7xl">
          Worn by those who own the room.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {loop.map((t, i) => (
            <div key={i} className="glass-card w-[360px] shrink-0 p-7">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
