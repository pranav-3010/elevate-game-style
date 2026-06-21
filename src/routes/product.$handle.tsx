import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Truck, Undo2 } from "lucide-react";
import { getProduct, formatPrice, products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Product360 } from "@/components/Product360";

export const Route = createFileRoute("/product/$handle")({
  loader: ({ params }) => {
    const product = getProduct(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "Product"} — One8 Commune` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.handle !== product.handle).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <nav className="mb-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-foreground">{product.category}</Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-card">
          <div className="relative aspect-[4/5]">
            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
            {product.badge && (
              <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">{product.badge}</span>
            )}
          </div>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">{product.category}</span>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-[0.02em] sm:text-6xl">{product.title}</h1>
          <div className="mt-5 font-display text-3xl">{formatPrice(product)}</div>
          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8">
            <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Size</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button key={s} className="h-12 min-w-[3rem] rounded-md border border-white/15 px-4 text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90">
              Add to bag <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-white/20 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] transition hover:border-foreground hover:bg-foreground hover:text-background">
              Save
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col items-start gap-2"><Truck className="h-4 w-4 text-foreground" /> 48h Express Ship</div>
            <div className="flex flex-col items-start gap-2"><Undo2 className="h-4 w-4 text-foreground" /> 30-day Returns</div>
            <div className="flex flex-col items-start gap-2"><Shield className="h-4 w-4 text-foreground" /> Authenticity Card</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-4xl tracking-[0.02em]">You may also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
