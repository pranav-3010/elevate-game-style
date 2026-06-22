import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, CreditCard, ShieldCheck, ArrowLeft, CheckCircle2, Banknote, Smartphone, Loader2, QrCode, Wallet } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/catalog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — One8 Commune" },
      { name: "description", content: "Complete your premium athletic luxury order securely." },
    ],
  }),
  component: Checkout,
});

type Step = "shipping" | "payment" | "processing" | "success";
type PayMethod = "credit" | "debit" | "upi" | "cod";

const methods: { id: PayMethod; label: string; sub: string; icon: any }[] = [
  { id: "credit", label: "Credit Card", sub: "Visa, Mastercard, Amex, RuPay", icon: CreditCard },
  { id: "debit",  label: "Debit Card",  sub: "All Indian bank debit cards",  icon: Wallet },
  { id: "upi",    label: "UPI",         sub: "GPay · PhonePe · Paytm · BHIM", icon: Smartphone },
  { id: "cod",    label: "Cash on Delivery", sub: "Pay in cash when it arrives", icon: Banknote },
];

export function Checkout() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [orderNumber, setOrderNumber] = useState("");
  const [method, setMethod] = useState<PayMethod>("credit");

  const [shippingForm, setShippingForm] = useState({
    firstName: "", lastName: "", email: "", address: "", city: "", state: "", zipCode: "", phone: "",
  });

  const [card, setCard] = useState({ cardNumber: "", expDate: "", cvv: "", cardName: "" });
  const [upi, setUpi] = useState("");
  const [codConfirm, setCodConfirm] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 10000 ? 0 : 350;
  const tax = Math.round(subtotal * 0.18);
  const codFee = method === "cod" ? 49 : 0;
  const grandTotal = subtotal + shippingCost + tax + codFee;

  const finishOrder = () => {
    const num = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`O8C-${num}`);
    setStep("success");
    clearCart();
  };

  const simulateProcessing = (label: string, ms = 1800) => {
    setStep("processing");
    toast.message(label);
    setTimeout(finishOrder, ms);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "credit" || method === "debit") {
      if (card.cardNumber.replace(/\s/g, "").length !== 16) return toast.error("Enter a valid 16-digit card number");
      if (!/^\d{2}\/\d{2}$/.test(card.expDate)) return toast.error("Enter expiry as MM/YY");
      if (card.cvv.length !== 3) return toast.error("Enter a valid 3-digit CVV");
      if (!card.cardName.trim()) return toast.error("Enter the name on card");
      simulateProcessing(`Authorising ${method === "credit" ? "credit" : "debit"} card · OTP verified`);
    } else if (method === "upi") {
      if (!/^[\w.\-]{2,}@[\w.\-]{2,}$/.test(upi)) return toast.error("Enter a valid UPI ID (e.g. name@okhdfc)");
      simulateProcessing(`Collect request sent to ${upi}. Approve in your UPI app...`, 2200);
    } else {
      if (!codConfirm) return toast.error("Please confirm you'll have cash ready on delivery");
      simulateProcessing("Placing your Cash on Delivery order...", 1200);
    }
  };

  if (cart.length === 0 && step !== "success" && step !== "processing") {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl uppercase tracking-wider">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
          You cannot checkout without items in your shopping bag.
        </p>
        <Link to="/shop" className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:px-8 lg:py-16">
      <div className="mb-8 sm:mb-10">
        <h1 className="font-display text-3xl uppercase tracking-[0.02em] sm:text-5xl">Checkout</h1>
        {step !== "success" && step !== "processing" && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className={step === "shipping" ? "text-primary" : "text-muted-foreground"}>1. Shipping</span>
            <span className="text-muted-foreground">/</span>
            <span className={step === "payment" ? "text-primary" : "text-muted-foreground"}>2. Payment</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">3. Confirm</span>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        <div>
          <AnimatePresence mode="wait">
            {step === "shipping" && (
              <motion.form
                key="shipping"
                onSubmit={handleShippingSubmit}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-5 sm:p-8 rounded-2xl border border-white/10 space-y-5"
              >
                <h2 className="font-display text-xl uppercase tracking-wider">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First Name" value={shippingForm.firstName} onChange={(v) => setShippingForm({ ...shippingForm, firstName: v })} />
                  <Field label="Last Name"  value={shippingForm.lastName}  onChange={(v) => setShippingForm({ ...shippingForm, lastName: v })} />
                </div>
                <Field label="Email Address" type="email" value={shippingForm.email} onChange={(v) => setShippingForm({ ...shippingForm, email: v })} />
                <Field label="Address line" value={shippingForm.address} onChange={(v) => setShippingForm({ ...shippingForm, address: v })} placeholder="Street address, apartment, suite..." />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="City"  value={shippingForm.city}  onChange={(v) => setShippingForm({ ...shippingForm, city: v })} />
                  <Field label="State" value={shippingForm.state} onChange={(v) => setShippingForm({ ...shippingForm, state: v })} />
                  <Field label="PIN / Zip" value={shippingForm.zipCode} onChange={(v) => setShippingForm({ ...shippingForm, zipCode: v })} />
                </div>
                <Field label="Phone Number" type="tel" value={shippingForm.phone} onChange={(v) => setShippingForm({ ...shippingForm, phone: v })} placeholder="10-digit mobile" />
                <button type="submit" className="w-full rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg cursor-pointer">
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === "payment" && (
              <motion.form
                key="payment"
                onSubmit={handlePay}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-5 sm:p-8 rounded-2xl border border-white/10 space-y-6"
              >
                <div className="flex justify-between items-center gap-3">
                  <h2 className="font-display text-xl uppercase tracking-wider">Payment Method</h2>
                  <button type="button" onClick={() => setStep("shipping")} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition cursor-pointer">
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3.5 text-xs text-muted-foreground">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>256-bit SSL encrypted. We never store full card details.</span>
                </div>

                {/* Method selector */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {methods.map((m) => {
                    const Active = method === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition cursor-pointer ${
                          Active ? "border-primary bg-primary/10" : "border-white/10 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <span className={`grid h-10 w-10 place-items-center rounded-lg ${Active ? "bg-primary text-primary-foreground" : "bg-white/5 text-foreground"}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">{m.label}</span>
                          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground truncate">{m.sub}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Method-specific UI */}
                <AnimatePresence mode="wait">
                  {(method === "credit" || method === "debit") && (
                    <motion.div key="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <Field label="Name on Card" value={card.cardName} onChange={(v) => setCard({ ...card, cardName: v })} placeholder="As printed on card" />
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Card Number</label>
                        <div className="relative">
                          <input
                            type="text" required value={card.cardNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                              setCard({ ...card, cardNumber: val.replace(/(.{4})/g, "$1 ").trim() });
                            }}
                            maxLength={19} placeholder="4111 1111 1111 1111"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 pl-11 text-sm focus:outline-none focus:border-primary transition"
                          />
                          <CreditCard className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Expiry</label>
                          <input
                            type="text" required value={card.expDate}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                              setCard({ ...card, expDate: v });
                            }}
                            maxLength={5} placeholder="MM/YY"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">CVV</label>
                          <input
                            type="password" required value={card.cvv}
                            onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                            maxLength={3} placeholder="•••"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition text-center tracking-[0.4em]"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        After tapping Pay you'll be redirected to a simulated bank OTP screen for 3-D Secure authentication.
                      </p>
                    </motion.div>
                  )}

                  {method === "upi" && (
                    <motion.div key="upi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <Field label="UPI ID / VPA" value={upi} onChange={setUpi} placeholder="yourname@okhdfc" />
                      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="grid h-16 w-16 place-items-center rounded-lg bg-white text-black shrink-0">
                          <QrCode className="h-10 w-10" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div className="font-semibold text-foreground mb-0.5">Or scan & pay</div>
                          Open any UPI app, scan this QR, and approve the request to complete checkout instantly.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {method === "cod" && (
                    <motion.div key="cod" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-muted-foreground space-y-2">
                        <p>A handling fee of <span className="text-foreground font-semibold">₹49</span> applies to all Cash on Delivery orders.</p>
                        <p>Please keep exact change ready. Our courier will collect cash at the time of delivery and you'll receive a digital receipt by SMS.</p>
                      </div>
                      <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
                        <input type="checkbox" checked={codConfirm} onChange={(e) => setCodConfirm(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary cursor-pointer" />
                        I confirm I'll pay <span className="text-foreground font-semibold">₹{grandTotal.toLocaleString("en-IN")}</span> in cash at delivery.
                      </label>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="w-full rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg cursor-pointer">
                  {method === "cod" ? "Place COD Order" : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
                </button>
              </motion.form>
            )}

            {step === "processing" && (
              <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-10 rounded-2xl border border-white/10 text-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                <h2 className="mt-5 font-display text-2xl uppercase tracking-wider">Processing payment</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {method === "upi" ? "Waiting for your approval in the UPI app..." :
                   method === "cod" ? "Confirming your Cash on Delivery order..." :
                   "Authorising your card with the issuing bank..."}
                </p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass-card p-6 sm:p-12 rounded-2xl border border-emerald-500/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-wider">Order Confirmed</h2>
                <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                  Thank you, <span className="text-foreground font-semibold">{shippingForm.firstName || "athlete"}</span>. Your order is being prepared for 48h express dispatch.
                </p>
                <div className="glass-card max-w-sm mx-auto my-8 p-5 border border-white/5 text-left divide-y divide-white/5">
                  <Row k="Order Reference" v={orderNumber} mono />
                  <Row k="Payment Method"  v={methods.find((m) => m.id === method)!.label} />
                  <Row k="Total Charged"   v={method === "cod" ? `₹${grandTotal.toLocaleString("en-IN")} (on delivery)` : `₹${grandTotal.toLocaleString("en-IN")}`} />
                  {shippingForm.city && <Row k="Shipping To" v={`${shippingForm.city}, ${shippingForm.state}`} />}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/shop" className="rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg">Continue Shopping</Link>
                  <Link to="/" className="rounded-full border border-white/20 px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition">Back to Home</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step !== "success" && step !== "processing" && (
          <aside>
            <div className="lg:sticky lg:top-24 border border-white/10 rounded-2xl p-5 sm:p-6 bg-card space-y-5">
              <h2 className="font-display text-lg uppercase tracking-wider">Order Summary</h2>
              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto scrollbar-thin pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.handle}-${item.size}`} className="flex gap-3 py-3 first:pt-0">
                    <div className="aspect-[3/4] w-12 overflow-hidden rounded bg-white/5 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="text-xs font-semibold line-clamp-1">{item.product.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium self-center">{formatPrice(item.product)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                <Line k="Subtotal" v={`₹${subtotal.toLocaleString("en-IN")}`} />
                <Line k="Shipping" v={shippingCost === 0 ? "Free" : `₹${shippingCost}`} />
                <Line k="GST (18%)" v={`₹${tax.toLocaleString("en-IN")}`} />
                {codFee > 0 && <Line k="COD Handling" v={`₹${codFee}`} />}
                <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span className="font-display text-base text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      <input
        type={type} required value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition"
      />
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between text-sm py-2.5 first:pt-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={`text-foreground font-medium text-right ${mono ? "font-mono tracking-wider" : ""}`}>{v}</span>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{k}</span><span>{v}</span>
    </div>
  );
}
