import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group hover-lift block overflow-hidden rounded-lg border border-white/10 bg-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background">
            Quick add
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-xl leading-tight tracking-[0.04em]">{product.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{product.category}</p>
        </div>
        <span className="whitespace-nowrap font-display text-xl text-foreground">{formatPrice(product)}</span>
      </div>
    </Link>
  );
}
