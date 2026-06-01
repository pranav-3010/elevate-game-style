# One8 Commune — Cinematic Luxury Storefront

A dark, cinematic e-commerce experience inspired by premium athletic streetwear (Nike / Fear of God / Apple product pages). Real Shopify catalog, cart, and checkout — no mock data.

> Note: To stay safe, the site will be branded as **One8 Commune** with copy framed as "athletic luxury streetwear" — no claims of being an official Virat Kohli campaign or use of his name/likeness. The aesthetic captures the vibe without the IP risk.

---

## Brand & Design System

**Palette (luxury sporty)**
- Matte Black `#0A0A0A` (background)
- Obsidian `#141414` (cards)
- Pearl White `#F5F5F2` (foreground)
- Crimson `#D8232A` (primary accent / CTAs)
- Metallic Silver `#B8B8BD` (muted)

**Typography**
- Display: Bebas Neue (oversized hero, section headings)
- Body / UI: Satoshi (with General Sans fallback)
- Loaded via Fontshare CDN

**Motion language**
- Framer Motion for component-level reveals, magnetic buttons, hover tilt
- GSAP + ScrollTrigger for scroll-pinned sneaker section and parallax bands
- Lenis for smooth inertial scrolling
- Restrained: long easings, low opacity flickers, no bouncy springs

---

## Sitemap (TanStack Start routes)

```
/                  Home (cinematic landing)
/shop              Full product grid + filters
/collections       Curated collection tiles
/drops             Limited / Featured Drops
/category/$slug    Men, Women, Sneakers, Watches, Accessories,
                   Bracelets, Socks, Gym Wear, Smart Gadgets
/product/$handle   Product detail
/about             Brand story
/community         Lifestyle feed (static editorial)
/contact           Contact form (mailto for now)
```

Each route gets its own `head()` metadata (title, description, og tags).

---

## Page Composition

**Home `/`**
1. Hero — full-viewport matte-black canvas, Bebas Neue "OWN THE GAME" with animated reveal, subhead, two CTAs (Shop Drops / Explore Sneakers), floating sneaker silhouette + ambient grain
2. Marquee ticker — "NEW SEASON · LIMITED DROP · ATHLETIC LUXURY"
3. Category grid — 9 large image tiles (Men, Women, Sneakers, Watches, Accessories, Bracelets, Socks, Gym Wear, Smart Gadgets) with hover tilt
4. Scroll-pinned Sneaker showcase — GSAP ScrollTrigger pins a sneaker hero, rotates it through 3 angles, specs fade in beside it, background hue shifts
5. Featured Drops slider — horizontal snap carousel of live Shopify products
6. Lifestyle banner — split editorial imagery (gym / watch / street) in monochrome with crimson accents
7. Limited Edition strip — countdown-styled cards
8. Newsletter / community CTA
9. Footer — multi-column with categories, social, legal

**Shop / Category pages** — filterable product grid (price, availability), product card with lift-on-hover + quick-add overlay.

**Product `/product/$handle`** — left: cinematic image gallery, right: title, price, variant selectors (size/color from Shopify options), Add to Cart, description, shipping/returns accordions.

**Cart** — slide-in `Sheet` drawer (per Shopify spec) with line item controls and "Checkout with Shopify" button.

---

## Shopify Integration (real, no mocks)

- Storefront API v2025-07 via `storefrontApiRequest` helper
- Tokens fetched once and stored as constants in `src/lib/shopify/config.ts`
- `ShopifyProduct` types + `STOREFRONT_QUERY` for product listing
- Category pages filter via `query` param (e.g. `product_type:Sneakers` or `tag:men`)
- Zustand cart store (`src/stores/cartStore.ts`) with persist, lineId tracking, cart-not-found recovery
- `CART_CREATE / LINES_ADD / LINES_UPDATE / LINES_REMOVE` mutations
- `useCartSync` hook wired in `__root.tsx` to clear cart after checkout
- Cart drawer opens checkout URL (with `channel=online_store`) in a new tab — never manual URLs
- Empty state: if zero products exist, every grid shows "No products found" with a prompt to add via chat

---

## Animation Inventory

| Surface | Technique |
| --- | --- |
| Page transitions | Framer Motion fade + slight Y |
| Hero headline | GSAP SplitText-style staggered char reveal |
| Sneaker section | GSAP ScrollTrigger pin + timeline |
| Parallax bands | Framer `useScroll` + transform |
| Category tiles | Framer `whileHover` tilt + shadow |
| Buttons | Magnetic effect (mouse-follow translate) |
| Product cards | Lift + quick-add reveal on hover |
| Smooth scroll | Lenis global instance |

---

## Technical Details

**Stack additions**
- `bun add zustand framer-motion gsap lenis` (Lenis + GSAP are Worker-safe — client-only via `useEffect`)
- Fonts loaded in `__root.tsx` via Fontshare `<link>` tags
- Tailwind tokens extended in `src/styles.css` with the luxury palette in `oklch`

**File map**
```
src/
  lib/shopify/
    config.ts          # constants, types, GraphQL queries
    api.ts             # storefrontApiRequest + cart mutations
  stores/cartStore.ts
  hooks/
    useCartSync.ts
    useLenis.ts
    useMagnetic.ts
  components/
    layout/{Header,Footer,CartDrawer,Marquee}.tsx
    home/{Hero,CategoryGrid,SneakerScroll,FeaturedDrops,LifestyleBanner,LimitedDrops,Newsletter}.tsx
    product/{ProductCard,ProductGallery,VariantPicker}.tsx
    ui/{MagneticButton,TiltCard,RevealText}.tsx
  routes/
    __root.tsx (Lenis + cart sync + header/footer)
    index.tsx, shop.tsx, collections.tsx, drops.tsx,
    category.$slug.tsx, product.$handle.tsx,
    about.tsx, community.tsx, contact.tsx
  styles.css (palette, fonts, base)
```

**Out of scope (call out as future)**
- AI outfit recs, 3D sneaker configurator, AR try-on, AR/animated checkout, loyalty, influencer feed, fitness integrations — all noted for later phases.
- Cricket/celebrity imagery left as visual direction only; no real-person likeness used.

---

## What you'll see after build

A working dark luxury storefront with all 9 categories, cinematic home, real Shopify cart & checkout, ready for you to add products. After approving, I'll also open the Claim Store prompt so you can start your 30-day Shopify trial whenever you're ready.
