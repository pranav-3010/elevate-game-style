import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { products, categories as initialCategories, formatPrice, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewDialog } from "@/components/QuickViewDialog";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — One8 Commune" },
      { name: "description", content: "Shop the full One8 Commune catalog — athletic luxury for men and women." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toggle category filter
  const handleCategoryChange = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  // Toggle size filter
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setMaxPrice(40000);
    setSelectedSizes([]);
    setSortBy("featured");
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter (up to maxPrice)
    result = result.filter((p) => p.price <= maxPrice);

    // Size filter (mock logic: sneakers support US sizes, apparel supports S/M/L/XL)
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        const itemType = p.category === "sneakers" ? "sneaker" : "apparel";
        return selectedSizes.some((s) => {
          if (itemType === "sneaker") {
            return s.startsWith("US");
          } else {
            return !s.startsWith("US");
          }
        });
      });
    }

    // Sorting
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-a-z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, selectedCategories, maxPrice, selectedSizes, sortBy]);

  const allSizes = ["S", "M", "L", "XL", "US 7", "US 8", "US 9", "US 10", "US 11"];

  const renderFiltersContent = () => (
    <div className="space-y-8">
      {/* Search Input */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-3">Search</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search catalog..."
          className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Category Checkboxes */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {initialCategories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-3 text-sm text-foreground/80 cursor-pointer hover:text-foreground">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => handleCategoryChange(cat.slug)}
                className="accent-primary h-4 w-4 rounded border-white/10 bg-white/5 text-primary"
              />
              <span className="capitalize">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground">Max Price</h3>
          <span className="text-sm font-semibold text-primary">₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <Slider
          defaultValue={[maxPrice]}
          value={[maxPrice]}
          onValueChange={(val) => setMaxPrice(val[0])}
          min={1000}
          max={40000}
          step={500}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
          <span>₹1,000</span>
          <span>₹40,000</span>
        </div>
      </div>

      {/* Sizes Grid */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground mb-4">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`py-2 text-[11px] rounded font-medium transition cursor-pointer border ${
                selectedSizes.includes(size)
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_8px_var(--primary)]"
                  : "border-white/10 hover:border-foreground bg-white/5 text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Button */}
      <button
        onClick={resetFilters}
        className="w-full rounded-full border border-white/20 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-foreground hover:bg-foreground hover:text-background transition cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-primary">Storefront</span>
          <h1 className="mt-2 font-display text-5xl tracking-[0.02em] sm:text-7xl">The Shop</h1>
          <p className="mt-3 max-w-lg text-sm text-foreground/70">
            Engineered silhouettes in rotation. Standard-setting sneakers, custom tailoring, and performance gear.
          </p>
        </div>

        {/* Dynamic Filters Count & Sorting Sub-Bar */}
        <div className="flex items-center justify-between md:justify-end gap-4 border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
          <span className="text-xs text-muted-foreground font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? "Result" : "Results"}
          </span>

          <div className="flex items-center gap-2">
            {/* Desktop Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-wider text-foreground hover:border-foreground cursor-pointer transition"
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>

            {/* Mobile Filters Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-wider text-foreground hover:border-foreground cursor-pointer transition">
                  <SlidersHorizontal className="h-3 w-3" />
                  <span>Filters</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="glass border-r border-white/10 w-full sm:max-w-xs text-foreground p-6 overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-left font-display uppercase tracking-widest">Filter By</SheetTitle>
                </SheetHeader>
                {renderFiltersContent()}
              </SheetContent>
            </Sheet>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-white/10 hover:border-foreground rounded-full px-5 py-2 pr-9 text-xs uppercase tracking-wider focus:outline-none cursor-pointer transition"
              >
                <option value="featured" className="bg-background text-foreground">Featured</option>
                <option value="price-low-high" className="bg-background text-foreground">Price: Low - High</option>
                <option value="price-high-low" className="bg-background text-foreground">Price: High - Low</option>
                <option value="name-a-z" className="bg-background text-foreground">Name: A - Z</option>
              </select>
              <ChevronDown className="absolute right-3.5 h-3 w-3 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-10">
        {/* Desktop Sidebar Filters */}
        {showFilters && (
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 border-r border-white/5 pr-8 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin">
              {renderFiltersContent()}
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="glass-card flex flex-col items-center justify-center text-center p-12 py-20 rounded-lg">
              <h3 className="font-display text-xl uppercase tracking-wider text-foreground">No matches found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Try widening your price range, choosing different sizes, or searching for other keywords.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95 cursor-pointer shadow-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.handle}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Dialog */}
      <QuickViewDialog
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </div>
  );
}
