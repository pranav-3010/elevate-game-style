// Static catalog used for the One8 Commune storefront preview.
// Replace later with a real Shopify Storefront API integration.

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type Product = {
  handle: string;
  title: string;
  category: string; // slug
  price: number;
  currency: string;
  description: string;
  image: string;
  badge?: string;
  /** Ordered frame URLs for true 360° spin. Optional. */
  frames?: string[];
};

const img = (q: string, w = 1200, h = 1500) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const categories: Category[] = [
  { slug: "men",        name: "Men Wear",       tagline: "Athletic tailoring",   image: img("photo-1520975916090-3105956dac38") },
  { slug: "women",      name: "Women Wear",     tagline: "Sculpted essentials",  image: img("photo-1483985988355-763728e1935b") },
  { slug: "sneakers",   name: "Sneakers",       tagline: "Court to street",      image: img("photo-1542291026-7eec264c27ff") },
  { slug: "watches",    name: "Watches",        tagline: "Time, refined",        image: img("photo-1524592094714-0f0654e20314") },
  { slug: "accessories",name: "Accessories",    tagline: "Finishing pieces",     image: img("photo-1591561954557-26941169b49e") },
  { slug: "bracelets",  name: "Bracelets",      tagline: "Wrist game",           image: img("photo-1611652022419-a9419f74343d") },
  { slug: "socks",      name: "Socks",          tagline: "Performance basics",   image: img("photo-1586350977771-b3b0abd50c82") },
  { slug: "gym",        name: "Gym Wear",       tagline: "Engineered for sweat", image: img("photo-1517836357463-d25dfeac3438") },
  { slug: "gadgets",    name: "Smart Gadgets",  tagline: "Quietly powerful",     image: img("photo-1505740420928-5e560c06d30e") },
  { slug: "kids",       name: "Kids",           tagline: "Next-gen athletes",    image: img("photo-1503944583220-79d8926ad5e2") },
];

export const products: Product[] = [
  { handle: "shadow-runner-01", title: "Shadow Runner 01",  category: "sneakers", price: 18999, currency: "INR", description: "Court-derived silhouette in obsidian leather and rubberised mesh. Reinforced heel cradle, foam tooling.", image: img("photo-1542291026-7eec264c27ff"), badge: "NEW DROP" },
  { handle: "crimson-court",     title: "Crimson Court",     category: "sneakers", price: 21500, currency: "INR", description: "Crimson nubuck over a chunky vulcanised midsole. Limited run of 300 pairs.", image: img("photo-1595950653106-6c9ebd614d3a"), badge: "LIMITED" },
  { handle: "iron-tee",          title: "Iron Tee — Matte",  category: "men",      price: 2999,  currency: "INR", description: "240gsm combed cotton, structured neckline, dropped shoulder. Cut for a confident frame.", image: img("photo-1520975916090-3105956dac38") },
  { handle: "field-bomber",      title: "Field Bomber",      category: "men",      price: 14990, currency: "INR", description: "Technical nylon shell with crimson satin lining. Magnetic placket, ribbed cuffs.", image: img("photo-1551488831-00ddcb6c6bd3") },
  { handle: "sculpt-tank",       title: "Sculpt Tank",       category: "women",    price: 3490,  currency: "INR", description: "Compression-knit support with a sculpted racerback. Studio to street.", image: img("photo-1483985988355-763728e1935b") },
  { handle: "atelier-watch-08",  title: "Atelier 08 Chrono", category: "watches",  price: 38000, currency: "INR", description: "44mm sandblasted case, sapphire crystal, automatic movement. Calf leather strap.", image: img("photo-1524592094714-0f0654e20314"), badge: "FEATURED" },
  { handle: "monolith-cuff",     title: "Monolith Cuff",     category: "bracelets",price: 7900,  currency: "INR", description: "Solid 316L steel cuff with brushed matte finish and engraved interior.", image: img("photo-1611652022419-a9419f74343d") },
  { handle: "grid-cap",          title: "Grid Cap",          category: "accessories", price: 2200, currency: "INR", description: "Six-panel structured crown, embroidered ONE8 monogram, leather strap.", image: img("photo-1591561954557-26941169b49e") },
  { handle: "performance-sock-3",title: "Performance Sock × 3", category: "socks", price: 1290,  currency: "INR", description: "Three-pack of arch-support performance crew socks in matte black.", image: img("photo-1586350977771-b3b0abd50c82") },
  { handle: "stride-shorts",     title: "Stride Shorts 7\"",   category: "gym",     price: 2799,  currency: "INR", description: "Four-way stretch with bonded seams and concealed phone pocket.", image: img("photo-1517836357463-d25dfeac3438") },
  { handle: "pulse-buds",        title: "Pulse Buds Pro",    category: "gadgets",  price: 11999, currency: "INR", description: "Active noise cancelling earbuds with sport hooks and IPX5 sweatproofing.", image: img("photo-1505740420928-5e560c06d30e") },
  { handle: "circuit-band",      title: "Circuit Smart Band",category: "gadgets",  price: 7990,  currency: "INR", description: "OLED touch display, heart-rate, SpO2, 14-day battery. Crimson detail.", image: img("photo-1508685096489-7aacd43bd3b1") },
];

export const featuredHandles = ["shadow-runner-01", "crimson-court", "atelier-watch-08", "field-bomber", "pulse-buds", "monolith-cuff"];
export const limitedHandles  = ["crimson-court", "atelier-watch-08", "field-bomber"];

export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const formatPrice = (p: Product) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: p.currency, maximumFractionDigits: 0 }).format(p.price);
