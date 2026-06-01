import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-sm tracking-widest lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-2xl tracking-[0.18em] lg:text-3xl">
          ONE<span className="text-primary">8</span> COMMUNE
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[12px] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden text-foreground/70 transition hover:text-foreground sm:block">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="hidden text-foreground/70 transition hover:text-foreground sm:block">
            <User className="h-5 w-5" />
          </button>
          <Link to="/shop" aria-label="Bag" className="relative text-foreground transition hover:text-primary">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold">0</span>
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-background lg:hidden">
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
        </div>
      )}
    </header>
  );
}
