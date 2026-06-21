import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/drops", label: "Drops" },
  { to: "/category/sneakers", label: "Sneakers" },
  { to: "/about", label: "About" },
  { to: "/community", label: "Community" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/10"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-sm tracking-widest lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="font-display text-2xl tracking-[0.04em] lg:text-3xl">
            ONE<span className="text-primary">8</span> COMMUNE
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="underline-grow text-[11px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground", "data-active": "true" } as any}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="text-foreground/70 transition hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Account" className="hidden text-foreground/70 transition hover:text-primary sm:block">
              <User className="h-5 w-5" />
            </button>
            <Link to="/shop" aria-label="Bag" className="relative text-foreground transition hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold shadow-[0_0_12px_var(--primary)]">
                0
              </span>
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass border-t border-white/10 lg:hidden"
            >
              <nav className="flex flex-col px-5 py-4">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm uppercase tracking-[0.22em] text-foreground/80"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-16 lg:h-20" aria-hidden />

      {/* Search modal */}
      <AnimatePresence>
        {search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-2xl"
            onClick={() => setSearch(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="mx-auto mt-32 max-w-2xl px-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-card flex items-center gap-3 px-5 py-4">
                <Search className="h-5 w-5 text-foreground/60" />
                <input
                  autoFocus
                  placeholder="Search sneakers, collections, drops…"
                  className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={() => setSearch(false)} className="text-xs uppercase tracking-[0.22em] text-foreground/60">
                  Esc
                </button>
              </div>
              <div className="mt-6 grid gap-2">
                {["Crimson Court", "Shadow Runner 01", "Black Capsule", "Iron Tee"].map((s) => (
                  <Link
                    key={s}
                    to="/shop"
                    onClick={() => setSearch(false)}
                    className="glass-card flex items-center justify-between px-5 py-4 transition hover:border-primary/50"
                  >
                    <span className="text-sm">{s}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">Suggested</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
