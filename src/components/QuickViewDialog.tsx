import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Product, formatPrice } from "@/lib/catalog";
import { useCart } from "@/hooks/useCart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuickViewDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewDialog({ product, open, onOpenChange }: QuickViewDialogProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState(false);

  if (!product) return null;

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError(true);
      return;
    }
    addToCart(product, selectedSize);
    setError(false);
    setSelectedSize(null);
    onOpenChange(false);
  };

  const sizes = product.category === "sneakers" 
    ? ["US 7", "US 8", "US 9", "US 10", "US 11"]
    : ["S", "M", "L", "XL"];

  return (
    <Dialog open={open} onOpenChange={(openVal) => {
      if (!openVal) {
        setSelectedSize(null);
        setError(false);
      }
      onOpenChange(openVal);
    }}>
      <DialogContent className="glass border-white/10 sm:max-w-3xl text-foreground p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-white/5 border-r border-white/5 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-primary-foreground shadow-[0_0_12px_var(--primary)]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-primary">
                {product.category}
              </span>
              <DialogHeader className="mt-2 text-left">
                <DialogTitle className="font-display text-3xl leading-tight tracking-wider">
                  {product.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-3 font-display text-2xl text-foreground font-semibold">
                {formatPrice(product)}
              </div>

              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Select Size</span>
                  {error && <span className="text-primary font-bold animate-pulse">Required</span>}
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setError(false);
                      }}
                      className={`h-11 rounded border text-xs font-medium uppercase tracking-wider transition ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_var(--primary)]"
                          : "border-white/10 hover:border-foreground bg-white/5 text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleAddToBag}
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95 shadow-lg"
              >
                Add to bag <ShoppingBag className="h-4 w-4" />
              </button>

              <Link
                to="/product/$handle"
                params={{ handle: product.handle }}
                onClick={() => onOpenChange(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
              >
                View Full Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
