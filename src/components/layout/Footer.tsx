import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: [
      { to: "/category/men", label: "Men Wear" },
      { to: "/category/women", label: "Women Wear" },
      { to: "/category/sneakers", label: "Sneakers" },
      { to: "/category/watches", label: "Watches" },
      { to: "/category/gym", label: "Gym Wear" },
    ],
  },
  {
    title: "Brand",
    links: [
      { to: "/about", label: "About" },
      { to: "/community", label: "Community" },
      { to: "/drops", label: "Limited Drops" },
      { to: "/collections", label: "Collections" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/contact", label: "Shipping & Returns" },
      { to: "/contact", label: "Size Guide" },
      { to: "/contact", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" className="font-display text-3xl tracking-[0.18em]">
              ONE<span className="text-primary">8</span> COMMUNE
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Athletic luxury, engineered for the modern game. Inspired by sport, built for the street.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-foreground/70 transition hover:border-primary hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-lg tracking-[0.2em] text-foreground">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground transition hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} One8 Commune. All rights reserved.</span>
          <span>Designed in matte black.</span>
        </div>
      </div>
    </footer>
  );
}
