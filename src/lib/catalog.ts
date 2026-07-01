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
  // Sneakers
  { handle: "shadow-runner-01", title: "Shadow Runner 01",  category: "sneakers", price: 18999, currency: "INR", description: "Court-derived silhouette in obsidian leather and rubberised mesh. Reinforced heel cradle, foam tooling.", image: img("photo-1542291026-7eec264c27ff"), badge: "NEW DROP" },
  { handle: "crimson-court",     title: "Crimson Court",     category: "sneakers", price: 21500, currency: "INR", description: "Crimson nubuck over a chunky vulcanised midsole. Limited run of 300 pairs.", image: img("photo-1595950653106-6c9ebd614d3a"), badge: "LIMITED" },
  { handle: "phantom-court",     title: "Phantom Court 02",  category: "sneakers", price: 24500, currency: "INR", description: "Monochromatic premium calfskin leather court sneaker with customized honey-gum cupsole. Heavy stitch detail.", image: img("photo-1525966222134-fcfa99b8ae77") },
  { handle: "vector-run",        title: "Vector Run Knit",   category: "sneakers", price: 16990, currency: "INR", description: "Engineered single-thread knit upper on an ultra-responsive responsive carbon-plate energy sole.", image: img("photo-1460353581641-37baddab0fa2") },
  
  // Men
  { handle: "iron-tee",          title: "Iron Tee — Matte",  category: "men",      price: 2999,  currency: "INR", description: "240gsm combed cotton, structured neckline, dropped shoulder. Cut for a confident frame.", image: img("photo-1520975916090-3105956dac38") },
  { handle: "field-bomber",      title: "Field Bomber",      category: "men",      price: 14990, currency: "INR", description: "Technical nylon shell with crimson satin lining. Magnetic placket, ribbed cuffs.", image: img("photo-1551488831-00ddcb6c6bd3") },
  { handle: "atelier-polo",      title: "Atelier Knit Polo", category: "men",      price: 4490,  currency: "INR", description: "Structured fine-gauge knit polo with ribbed collar. Breathable fabric engineered for seamless transitions.", image: img("photo-1586363104862-3a5e2ab60d99") },
  { handle: "commune-pant",      title: "Commune Tech Pant", category: "men",      price: 8990,  currency: "INR", description: "Technical tailored joggers with water-repellent finish, smart zipper pockets, and structured drawcords.", image: img("photo-1479064555552-3ef4979f8908") },
  
  // Women
  { handle: "sculpt-tank",       title: "Sculpt Tank",       category: "women",    price: 3490,  currency: "INR", description: "Compression-knit support with a sculpted racerback. Studio to street.", image: img("photo-1483985988355-763728e1935b") },
  { handle: "aura-leggings",     title: "Aura High Leggings",category: "women",    price: 4990,  currency: "INR", description: "Buttery-soft recycled interlock fabric offering high compression and second-skin comfort. Back waist card pocket.", image: img("photo-1541534741688-6078c6bfb5c5") },
  { handle: "tempo-jacket",      title: "Tempo Windbreaker", category: "women",    price: 7490,  currency: "INR", description: "Ultralight ripstop shell featuring custom toggle adjusters, mesh venting panels, and clean elastic cuffs.", image: img("photo-1508214751196-bcfd4ca60f91") },
  
  // Watches
  { handle: "atelier-watch-08",  title: "Atelier 08 Chrono", category: "watches",  price: 38000, currency: "INR", description: "44mm sandblasted case, sapphire crystal, automatic movement. Calf leather strap.", image: img("photo-1524592094714-0f0654e20314"), badge: "FEATURED" },
  { handle: "monolith-diver",    title: "Monolith Diver GMT",category: "watches",  price: 48000, currency: "INR", description: "Professional dive watch, 300m water resistance, matte black dial, orange GMT hand. Rubber dive strap.", image: img("photo-1547996160-81dfa63595aa") },
  
  // Bracelets
  { handle: "monolith-cuff",     title: "Monolith Cuff",     category: "bracelets",price: 7900,  currency: "INR", description: "Solid 316L steel cuff with brushed matte finish and engraved interior.", image: img("photo-1611652022419-a9419f74343d") },
  { handle: "orbit-cuff",        title: "Orbit Silver Cuff", category: "bracelets",price: 9500,  currency: "INR", description: "Interlocking braided silver cords finished with a secure branded magnetic clasp in polished titanium.", image: img("photo-1573408301185-9146fe634ad0") },
  
  // Accessories
  { handle: "grid-cap",          title: "Grid Cap",          category: "accessories", price: 2200, currency: "INR", description: "Six-panel structured crown, embroidered ONE8 monogram, leather strap.", image: img("photo-1591561954557-26941169b49e") },
  { handle: "commune-duffel",    title: "Commune Duffel Bag",category: "accessories", price: 18990,currency: "INR", description: "Waterproof full-grain pebbled leather travel bag with integrated shoe compartment and padded shoulder strap.", image: img("photo-1553062407-98eeb64c6a62") },
  
  // Socks
  { handle: "performance-sock-3",title: "Performance Sock × 3", category: "socks", price: 1290,  currency: "INR", description: "Three-pack of arch-support performance crew socks in matte black.", image: img("photo-1586350977771-b3b0abd50c82") },
  { handle: "cushion-crew-pack", title: "Cushion Crew Pack",  category: "socks",     price: 1490,  currency: "INR", description: "Ribbed mid-calf compression crew socks with reinforced terry loop cushioning under the heel and toe.", image: img("photo-1582966772680-860e372bb558") },
  
  // Gym
  { handle: "stride-shorts",     title: "Stride Shorts 7\"",   category: "gym",     price: 2799,  currency: "INR", description: "Four-way stretch with bonded seams and concealed phone pocket.", image: img("photo-1517836357463-d25dfeac3438") },
  { handle: "apex-compress",     title: "Apex Compression Tee",category: "gym",     price: 3990,  currency: "INR", description: "Dri-fit muscle support with flatlock anti-chafing seams and mesh side ventilation zones.", image: img("photo-1506784983877-45594efa4cbe") },
  
  // Gadgets
  { handle: "pulse-buds",        title: "Pulse Buds Pro",    category: "gadgets",  price: 11999, currency: "INR", description: "Active noise cancelling earbuds with sport hooks and IPX5 sweatproofing.", image: img("photo-1505740420928-5e560c06d30e") },
  { handle: "circuit-band",      title: "Circuit Smart Band",category: "gadgets",  price: 7990,  currency: "INR", description: "OLED touch display, heart-rate, SpO2, 14-day battery. Crimson detail.", image: img("photo-1508685096489-7aacd43bd3b1") },
  { handle: "aura-smart-scale",  title: "Aura Smart Scale",  category: "gadgets",  price: 8990,  currency: "INR", description: "Tempered glass body composition analyzer. Syncs seamlessly with the health app via Bluetooth.", image: img("photo-1576091160399-112ba8d25d1d") },
  
  // Kids
  { handle: "mini-runner",       title: "Mini Runner",       category: "kids",     price: 4990,  currency: "INR", description: "Lightweight kids' sneaker with grippy outsole and soft foam collar. Sized 1Y–6Y.", image: img("photo-1503944583220-79d8926ad5e2"), badge: "NEW" },
  { handle: "junior-tracksuit",  title: "Junior Tracksuit",  category: "kids",     price: 3490,  currency: "INR", description: "Soft brushed fleece set with elasticated cuffs. Designed for play and podiums.", image: img("photo-1519457431-44ccd64a579b") },
  { handle: "rookie-tee",        title: "Rookie Tee",        category: "kids",     price: 1290,  currency: "INR", description: "Garment-washed cotton tee with embroidered ONE8 crest. Ages 4–12.", image: img("photo-1518831959646-742c3a14ebf7") },
  { handle: "varsity-hoodie",    title: "Varsity Hoodie",    category: "kids",     price: 2990,  currency: "INR", description: "Classic preppy sportswear style. Loopback cotton fleece hoodie with premium chenille logo applique.", image: img("photo-1519457431-44ccd64a579b") },
];

export const featuredHandles = ["shadow-runner-01", "crimson-court", "atelier-watch-08", "field-bomber", "pulse-buds", "monolith-cuff"];
export const limitedHandles  = ["crimson-court", "atelier-watch-08", "field-bomber"];

export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const formatPrice = (p: Product) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: p.currency, maximumFractionDigits: 0 }).format(p.price);
