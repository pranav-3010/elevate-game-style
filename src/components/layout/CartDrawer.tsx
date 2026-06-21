import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/catalog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { cart, isOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingThreshold = 10000; // Free shipping above 10,000 INR
  const isFreeShipping = subtotal >= shippingThreshold;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => toggleCart(open)}>
      <SheetContent className="glass border-l border-white/10 w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-white/5">
          <SheetTitle className="flex items-center gap-3 text-lg font-display uppercase tracking-widest text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>Shopping Bag ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg uppercase tracking-wider">Your bag is empty</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Every legend starts somewhere. Explore our latest drops and fill your rotation.
            </p>
            <button
              onClick={() => toggleCart(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="grid gap-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.handle}-${item.size}`}
                    className="flex gap-4 group/item"
                  >
                    <div className="relative aspect-[3/4] w-20 overflow-hidden rounded bg-white/5 border border-white/5 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                            {item.product.title}
                          </h4>
                          <span className="text-sm font-medium text-foreground">
                            {formatPrice(item.product)}
                          </span>
                        </div>
                        <p className="text-xs text-primary uppercase tracking-wider mt-0.5">
                          {item.product.category}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size: <span className="text-foreground font-semibold">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-white/10 rounded overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.handle, item.size, item.quantity - 1)
                            }
                            className="p-1 px-2 hover:bg-white/5 transition text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.handle, item.size, item.quantity + 1)
                            }
                            className="p-1 px-2 hover:bg-white/5 transition text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.handle, item.size)}
                          className="text-muted-foreground hover:text-primary transition p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-white/5 bg-black/40 backdrop-blur-md px-6 py-6 space-y-4">
              {/* Shipping progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {isFreeShipping
                      ? "You qualify for free shipping!"
                      : `Add ${new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(shippingThreshold - subtotal)} more for free shipping`}
                  </span>
                  <span className="text-foreground font-medium">
                    {isFreeShipping ? "FREE" : "Standard Rate"}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? "Free" : "₹350"}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-foreground">
                  <span>Subtotal</span>
                  <span className="font-display">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(subtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
              </div>

              <div className="grid gap-2 pt-2">
                <Link
                  to="/checkout"
                  onClick={() => toggleCart(false)}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95"
                >
                  Proceed to Checkout{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <button
                  onClick={() => toggleCart(false)}
                  className="w-full text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground py-2 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
