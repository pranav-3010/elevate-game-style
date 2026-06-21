import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useCart();
  const isWishlisted = wishlist.some((item) => item.handle === product.handle);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    if (onQuickView) {
      e.preventDefault();
      e.stopPropagation();
      onQuickView(product);
    }
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: product.handle }}
      className="group hover-lift block overflow-hidden rounded-lg border border-white/10 bg-card relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2.5 backdrop-blur-md border border-white/10 text-foreground transition-all duration-300 hover:scale-110 hover:bg-black/80 hover:text-primary cursor-pointer"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </button>

        {product.badge && (
          <span className="absolute left-4 top-4 rounded bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            {product.badge}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickViewClick}
            className="flex w-full items-center justify-between rounded-full bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-background cursor-pointer hover:bg-foreground/90 transition-colors"
          >
            {onQuickView ? "Quick view" : "View details"}
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
