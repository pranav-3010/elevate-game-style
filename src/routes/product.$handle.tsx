import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Truck, Undo2, Star, ThumbsUp, MessageSquare } from "lucide-react";
import { getProduct, formatPrice, products, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Product360 } from "@/components/Product360";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

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

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

const initialReviews: Record<string, Review[]> = {
  "shadow-runner-01": [
    { id: "1", author: "Pranav S.", rating: 5, date: "June 15, 2026", title: "Best running silhouette of the year", comment: "The obsidian leather looks premium in person, and the cushioning is top tier. Perfect for both short runs and street style.", verified: true, helpful: 24 },
    { id: "2", author: "Rohan D.", rating: 4, date: "May 28, 2026", title: "Incredibly stylish, runs a bit snug", comment: "Absolutely love the look. Fits slightly narrow around the toes, so you might want to size up if you have wider feet. Otherwise flawless.", verified: true, helpful: 15 },
  ],
  "crimson-court": [
    { id: "1", author: "Karan M.", rating: 5, date: "June 20, 2026", title: "Absolute head-turner", comment: "The crimson color is rich and pops beautifully. Midsole feels sturdy and premium. Well worth the price tag.", verified: true, helpful: 31 },
  ],
};

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.handle !== product.handle).slice(0, 3);

  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    return initialReviews[product.handle] || [
      { id: "d1", author: "Aman V.", rating: 5, date: "June 10, 2026", title: "Outstanding quality", comment: "Crafted to perfection. Stitching is highly precise, material is ultra durable. Highly recommended!", verified: true, helpful: 8 }
    ];
  });

  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = wishlist.some((item) => item.handle === product.handle);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.handle);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Saved to wishlist");
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Please select a size first");
      return;
    }
    addToCart(product, selectedSize);
    setSizeError(false);
    toast.success(`Added ${product.title} (Size: ${selectedSize}) to bag`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewTitle.trim() || !newReviewComment.trim()) {
      toast.error("Please fill in all review fields");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      author: newReviewAuthor,
      rating: newReviewRating,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      title: newReviewTitle,
      comment: newReviewComment,
      verified: true,
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setNewReviewAuthor("");
    setNewReviewRating(5);
    setNewReviewTitle("");
    setNewReviewComment("");
    setShowReviewForm(false);
    toast.success("Review submitted successfully! Thank you.");
  };

  const sizes = product.category === "sneakers"
    ? ["US 7", "US 8", "US 9", "US 10", "US 11"]
    : ["S", "M", "L", "XL"];

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <nav className="mb-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground capitalize">{product.category}</Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* Left Side: Product 360 Spin Viewer */}
        <div>
          <Product360
            frames={product.frames}
            image={product.image}
            alt={product.title}
            badge={product.badge}
          />
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Interactive 360° view · drag to rotate
          </p>
        </div>

        {/* Right Side: Product Details */}
        <div>
          <span className="text-[11px] uppercase tracking-[0.28em] text-primary">{product.category}</span>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-[0.02em] sm:text-6xl">{product.title}</h1>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${
                    i < Math.round(Number(averageRating)) ? "fill-primary" : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews.length} customer reviews)</span>
          </div>
          <div className="mt-5 font-display text-3xl">{formatPrice(product)}</div>
          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          {/* Size Selectors */}
          <div className="mt-8">
            <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>Size</span>
              {sizeError && <span className="text-primary font-bold animate-pulse">Please select a size</span>}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                  className={`h-12 min-w-[3.5rem] rounded-md border text-sm font-medium transition cursor-pointer ${
                    selectedSize === s
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_var(--primary)]"
                      : "border-white/15 px-4 text-foreground bg-white/5 hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag and Wishlist Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="group inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90 shadow-lg cursor-pointer"
            >
              Add to bag <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`rounded-full border px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] transition hover:border-foreground cursor-pointer ${
                isWishlisted
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/20 text-foreground bg-transparent hover:bg-foreground hover:text-background"
              }`}
            >
              {isWishlisted ? "Saved" : "Save"}
            </button>
          </div>

          {/* E-Commerce Badges */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col items-start gap-2"><Truck className="h-4 w-4 text-foreground" /> 48h Express Ship</div>
            <div className="flex flex-col items-start gap-2"><Undo2 className="h-4 w-4 text-foreground" /> 30-day Returns</div>
            <div className="flex flex-col items-start gap-2"><Shield className="h-4 w-4 text-foreground" /> Authenticity Card</div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl tracking-[0.02em] uppercase">You may also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="mt-20 border-t border-white/10 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl tracking-[0.02em] uppercase">Customer Reviews</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold font-display">{averageRating}</span>
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(Number(averageRating)) ? "fill-primary text-primary" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">based on {reviews.length} reviews</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-foreground hover:border-foreground cursor-pointer transition"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            {showReviewForm ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {/* Write a Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="glass-card max-w-2xl p-6 rounded-lg mb-10 border border-white/10 space-y-4">
            <h3 className="font-display text-lg uppercase tracking-wider text-foreground">Write a Customer Review</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full bg-background border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition cursor-pointer"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                  <option value={2}>2 Stars (Fair)</option>
                  <option value={1}>1 Star (Poor)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Review Title</label>
              <input
                type="text"
                required
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="Summarize your experience..."
                className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Review Content</label>
              <textarea
                required
                rows={4}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="What did you like or dislike about the fit, quality, or style?"
                className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95 cursor-pointer shadow-lg"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6 max-w-4xl">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-white/5 pb-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{review.author}</span>
                    {review.verified && (
                      <span className="text-[9px] uppercase tracking-wider bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-primary">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground block mt-1">{review.date}</span>
                </div>
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating ? "fill-primary text-primary" : "opacity-20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-sm mt-3 text-foreground">{review.title}</h4>
              <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{review.comment}</p>

              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
