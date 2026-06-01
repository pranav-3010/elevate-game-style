import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { categories, productsByCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, items: productsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Category"} — One8 Commune` },
      { name: "description", content: loaderData?.cat.tagline ?? "Shop the category." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <>
      <section className="relative isolate min-h-[55vh] overflow-hidden">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-end px-5 pb-12 pt-24 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">{cat.tagline}</span>
          <h1 className="mt-3 font-display text-7xl leading-[0.9] tracking-[0.02em] sm:text-9xl">{cat.name}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        {items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-card p-16 text-center">
            <p className="font-display text-3xl">Coming soon.</p>
            <p className="mt-2 text-sm text-muted-foreground">New pieces drop weekly. Check back, or <Link to="/shop" className="text-primary">explore the full shop</Link>.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
