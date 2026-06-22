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
  // SNEAKERS
  { handle: "shadow-runner-01", title: "Shadow Runner 01",  category: "sneakers", price: 18999, currency: "INR", description: "Court-derived silhouette in obsidian leather and rubberised mesh. Reinforced heel cradle, foam tooling.", image: img("photo-1542291026-7eec264c27ff"), badge: "NEW DROP" },
  { handle: "crimson-court",     title: "Crimson Court",     category: "sneakers", price: 21500, currency: "INR", description: "Crimson nubuck over a chunky vulcanised midsole. Limited run of 300 pairs.", image: img("photo-1595950653106-6c9ebd614d3a"), badge: "LIMITED" },
  { handle: "alloy-low",         title: "Alloy Low",         category: "sneakers", price: 15990, currency: "INR", description: "Low-top runner in brushed aluminium-tone mesh with translucent rubber sole.", image: img("photo-1600185365483-26d7a4cc7519") },
  { handle: "phantom-hi",        title: "Phantom Hi",        category: "sneakers", price: 23990, currency: "INR", description: "Hi-top basketball silhouette with carbon shank and zonal cushioning.", image: img("photo-1600269452121-4f2416e55c28"), badge: "ICON" },
  { handle: "trail-x-mid",       title: "Trail X Mid",       category: "sneakers", price: 17500, currency: "INR", description: "All-terrain mid with toothed lug outsole and weatherproof gusset.", image: img("photo-1606107557195-0e29a4b5b4aa") },

  // MEN
  { handle: "iron-tee",          title: "Iron Tee — Matte",  category: "men",      price: 2999,  currency: "INR", description: "240gsm combed cotton, structured neckline, dropped shoulder. Cut for a confident frame.", image: img("photo-1520975916090-3105956dac38") },
  { handle: "field-bomber",      title: "Field Bomber",      category: "men",      price: 14990, currency: "INR", description: "Technical nylon shell with crimson satin lining. Magnetic placket, ribbed cuffs.", image: img("photo-1551488831-00ddcb6c6bd3") },
  { handle: "atelier-hoodie",    title: "Atelier Hoodie",    category: "men",      price: 8990,  currency: "INR", description: "Heavyweight 480gsm loopback with garment-dye finish and embroidered crest.", image: img("photo-1556821840-3a63f95609a7") },
  { handle: "obsidian-cargo",    title: "Obsidian Cargo",    category: "men",      price: 7490,  currency: "INR", description: "Tapered ripstop cargo with bonded zip pockets and articulated knee.", image: img("photo-1473966968600-fa801b869a1a") },
  { handle: "monogram-overshirt",title: "Monogram Overshirt",category: "men",      price: 9990,  currency: "INR", description: "Boxy wool-blend overshirt with tonal monogram weave and horn buttons.", image: img("photo-1490114538077-0a7f8cb49891"), badge: "NEW" },

  // WOMEN
  { handle: "sculpt-tank",       title: "Sculpt Tank",       category: "women",    price: 3490,  currency: "INR", description: "Compression-knit support with a sculpted racerback. Studio to street.", image: img("photo-1483985988355-763728e1935b") },
  { handle: "aura-legging",      title: "Aura Legging",      category: "women",    price: 4790,  currency: "INR", description: "Buttery second-skin compression with high-waist contour and hidden pocket.", image: img("photo-1518310383802-640c2de311b6") },
  { handle: "noir-blazer",       title: "Noir Blazer",       category: "women",    price: 16990, currency: "INR", description: "Sharp-shoulder tailored blazer in matte tech-twill with crimson lining.", image: img("photo-1487222477894-8943e31ef7b2"), badge: "EDITION" },
  { handle: "ember-dress",       title: "Ember Slip Dress",  category: "women",    price: 8990,  currency: "INR", description: "Bias-cut satin slip with cowl neckline and adjustable straps.", image: img("photo-1539109136881-3be0616acf4b") },
  { handle: "cloud-puffer",      title: "Cloud Puffer",      category: "women",    price: 18990, currency: "INR", description: "Recycled down puffer with thermo-mapped baffles and storm cuffs.", image: img("photo-1551803091-e20673f15770") },

  // WATCHES
  { handle: "atelier-watch-08",  title: "Atelier 08 Chrono", category: "watches",  price: 38000, currency: "INR", description: "44mm sandblasted case, sapphire crystal, automatic movement. Calf leather strap.", image: img("photo-1524592094714-0f0654e20314"), badge: "FEATURED" },
  { handle: "chrono-onyx",       title: "Chrono Onyx",       category: "watches",  price: 45990, currency: "INR", description: "DLC-coated 42mm chronograph with anthracite sunray dial and tachymeter bezel.", image: img("photo-1547996160-81dfa63595aa") },
  { handle: "heritage-dial",     title: "Heritage Dial 39",  category: "watches",  price: 28990, currency: "INR", description: "Slim 39mm dress watch with applied indices and domed sapphire crystal.", image: img("photo-1523275335684-37898b6baf30") },
  { handle: "field-auto",        title: "Field Auto 40",     category: "watches",  price: 32990, currency: "INR", description: "200m water-resistant field automatic with screw-down crown and lume hands.", image: img("photo-1606858881338-3f0532bda435") },

  // ACCESSORIES
  { handle: "grid-cap",          title: "Grid Cap",          category: "accessories", price: 2200, currency: "INR", description: "Six-panel structured crown, embroidered ONE8 monogram, leather strap.", image: img("photo-1591561954557-26941169b49e") },
  { handle: "atlas-belt",        title: "Atlas Belt",        category: "accessories", price: 3490, currency: "INR", description: "Full-grain Italian leather with machined matte buckle.", image: img("photo-1624222247344-550fb60583dc") },
  { handle: "tactical-sling",    title: "Tactical Sling",    category: "accessories", price: 5990, currency: "INR", description: "Water-repellent crossbody with hypalon webbing and YKK Aquaguard zips.", image: img("photo-1547949003-9792a18a2601") },
  { handle: "noir-shades",       title: "Noir Shades",       category: "accessories", price: 6490, currency: "INR", description: "Sculpted acetate frames with polarised crimson-mirror lenses.", image: img("photo-1572635196237-14b3f281503f"), badge: "NEW" },

  // BRACELETS
  { handle: "monolith-cuff",     title: "Monolith Cuff",     category: "bracelets",price: 7900,  currency: "INR", description: "Solid 316L steel cuff with brushed matte finish and engraved interior.", image: img("photo-1611652022419-a9419f74343d") },
  { handle: "rope-band",         title: "Rope Band",         category: "bracelets",price: 2490,  currency: "INR", description: "Marine-grade paracord weave with magnetic steel clasp.", image: img("photo-1599643478518-a784e5dc4c8f") },
  { handle: "signet-link",       title: "Signet Link",       category: "bracelets",price: 9990,  currency: "INR", description: "Heavyweight curb-chain in PVD black steel with engraved signet plate.", image: img("photo-1602173574767-37ac01994b2a") },

  // SOCKS
  { handle: "performance-sock-3",title: "Performance Sock × 3", category: "socks", price: 1290,  currency: "INR", description: "Three-pack of arch-support performance crew socks in matte black.", image: img("photo-1586350977771-b3b0abd50c82") },
  { handle: "ribbed-crew-5",     title: "Ribbed Crew × 5",   category: "socks",    price: 1890,  currency: "INR", description: "Five-pack of ribbed mid-calf crews in merino-cotton blend.", image: img("photo-1589187151053-5ec8818e661b") },
  { handle: "no-show-pro-3",     title: "No-Show Pro × 3",   category: "socks",    price: 990,   currency: "INR", description: "Silicone-heel no-show liners with mesh ventilation panels.", image: img("photo-1610652492500-ded49ceeb378") },

  // GYM
  { handle: "stride-shorts",     title: "Stride Shorts 7\"",   category: "gym",     price: 2799,  currency: "INR", description: "Four-way stretch with bonded seams and concealed phone pocket.", image: img("photo-1517836357463-d25dfeac3438") },
  { handle: "vapor-tee",         title: "Vapor Training Tee", category: "gym",     price: 2490,  currency: "INR", description: "Sweat-wicking knit with laser perforations and reflective hits.", image: img("photo-1571019613454-1cb2f99b2d8b") },
  { handle: "lift-tank",         title: "Lift Tank",         category: "gym",     price: 1990,  currency: "INR", description: "Open-side training tank in airflow mesh with drop armhole.", image: img("photo-1581009146145-b5ef050c2e1e") },
  { handle: "power-joggers",     title: "Power Joggers",     category: "gym",     price: 4490,  currency: "INR", description: "Tapered tech-fleece joggers with zip ankle and crimson side stripe.", image: img("photo-1552902865-b72c031ac5ea") },

  // GADGETS
  { handle: "pulse-buds",        title: "Pulse Buds Pro",    category: "gadgets",  price: 11999, currency: "INR", description: "Active noise cancelling earbuds with sport hooks and IPX5 sweatproofing.", image: img("photo-1505740420928-5e560c06d30e") },
  { handle: "circuit-band",      title: "Circuit Smart Band",category: "gadgets",  price: 7990,  currency: "INR", description: "OLED touch display, heart-rate, SpO2, 14-day battery. Crimson detail.", image: img("photo-1508685096489-7aacd43bd3b1") },
  { handle: "atlas-cans",        title: "Atlas Over-Ears",   category: "gadgets",  price: 19990, currency: "INR", description: "Studio-grade over-ear cans with adaptive ANC and 40h battery.", image: img("photo-1518444028785-8f6f9d4c0d3a") },
  { handle: "nova-speaker",      title: "Nova Mini Speaker", category: "gadgets",  price: 6490,  currency: "INR", description: "Pocket-sized 360° speaker with deep bass radiator and IP67 rating.", image: img("photo-1545454675-3531b543be5d"), badge: "NEW" },

  // KIDS
  { handle: "mini-runner",       title: "Mini Runner",       category: "kids",     price: 4990,  currency: "INR", description: "Lightweight kids' sneaker with grippy outsole and soft foam collar. Sized 1Y–6Y.", image: img("photo-1503944583220-79d8926ad5e2"), badge: "NEW" },
  { handle: "junior-tracksuit",  title: "Junior Tracksuit",  category: "kids",     price: 3490,  currency: "INR", description: "Soft brushed fleece set with elasticated cuffs. Designed for play and podiums.", image: img("photo-1519457431-44ccd64a579b") },
  { handle: "rookie-tee",        title: "Rookie Tee",        category: "kids",     price: 1290,  currency: "INR", description: "Garment-washed cotton tee with embroidered ONE8 crest. Ages 4–12.", image: img("photo-1518831959646-742c3a14ebf7") },
  { handle: "kid-court-hi",      title: "Kid Court Hi",      category: "kids",     price: 5490,  currency: "INR", description: "Mini hi-top court shoe with velcro strap and padded ankle collar.", image: img("photo-1514989940723-e8e51635b782") },
  { handle: "puff-jacket-kids",  title: "Puff Jacket — Kids",category: "kids",     price: 4990,  currency: "INR", description: "Recycled-down puffer with hood and reflective trims for school runs.", image: img("photo-1519278409-1f56fdda7fe5") },
];

export const featuredHandles = ["shadow-runner-01", "crimson-court", "atelier-watch-08", "field-bomber", "pulse-buds", "monolith-cuff"];
export const limitedHandles  = ["crimson-court", "atelier-watch-08", "field-bomber"];

export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const formatPrice = (p: Product) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: p.currency, maximumFractionDigits: 0 }).format(p.price);
