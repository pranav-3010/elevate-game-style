import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ShoppingBag, CreditCard, ShieldCheck, ArrowLeft, Heart, Sparkles, CheckCircle2, Smartphone, Copy } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/catalog";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import upiQr from "@/assets/upi-qr.jpeg.asset.json";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — One8 Commune" },
      { name: "description", content: "Complete your premium athletic luxury order securely." },
    ],
  }),
  component: Checkout,
});

type Step = "shipping" | "payment" | "success";

export function Checkout() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("upi");
  const [upiTxnId, setUpiTxnId] = useState("");

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expDate: "",
    cvv: "",
    cardName: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 10000 ? 0 : 350;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (paymentForm.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      if (paymentForm.cvv.length !== 3) {
        toast.error("Please enter a valid 3-digit CVV");
        return;
      }
    } else {
      if (upiTxnId.trim().length < 6) {
        toast.error("Enter the UPI transaction / UTR ID after payment");
        return;
      }
    }

    const num = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`O8C-${num}`);

    setStep("success");
    clearCart();
    toast.success("Order placed successfully! Check your email for confirmation.");
  };

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl uppercase tracking-wider text-foreground">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
          You cannot checkout without items in your shopping bag. Explore our latest sneakers and gear.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/95"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl uppercase tracking-[0.02em] sm:text-5xl">Checkout</h1>
        {step !== "success" && (
          <div className="mt-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <span className={step === "shipping" ? "text-primary" : "text-muted-foreground"}>1. Shipping</span>
            <span className="text-muted-foreground">/</span>
            <span className={step === "payment" ? "text-primary" : "text-muted-foreground"}>2. Payment</span>
          </div>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Left Side: Dynamic Step Render */}
        <div>
          <AnimatePresence mode="wait">
            {step === "shipping" && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleShippingSubmit} className="glass-card p-6 md:p-8 rounded-lg border border-white/10 space-y-6">
                  <h2 className="font-display text-xl uppercase tracking-wider text-foreground">Shipping Address</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Address line</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      placeholder="Street address, apartment, suite..."
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">State</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">PIN / Zip Code</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handlePaymentSubmit} className="glass-card p-6 md:p-8 rounded-lg border border-white/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl uppercase tracking-wider text-foreground">Secure Payment</h2>
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition"
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                  </div>

                  {/* Method toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-white/5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition ${paymentMethod === "upi" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <Smartphone className="h-3.5 w-3.5" /> UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition ${paymentMethod === "card" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Card
                    </button>
                  </div>

                  {paymentMethod === "upi" ? (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
                        <div className="relative mx-auto">
                          <div className="absolute -inset-3 bg-primary/20 blur-2xl rounded-3xl" />
                          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#f5d39a] p-2 w-[220px]">
                            <img src={upiQr.url} alt="UPI QR Code" className="w-full h-auto block" />
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <p className="font-display text-lg uppercase tracking-wider text-foreground">Scan & Pay</p>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            Open any UPI app (GPay, PhonePe, Paytm, BHIM) and scan the QR to pay
                            <span className="block mt-1 text-foreground font-semibold">₹{grandTotal.toLocaleString("en-IN")}</span>
                          </p>
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Trio UPI</span>
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Instant</span>
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">0% fee</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">UPI Transaction / UTR ID</label>
                        <input
                          type="text"
                          required
                          value={upiTxnId}
                          onChange={(e) => setUpiTxnId(e.target.value)}
                          placeholder="e.g. 412345678901"
                          className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition tracking-wider"
                        />
                        <p className="text-[10px] text-muted-foreground mt-1.5">After paying, copy the reference / UTR from your UPI app and paste it here to confirm the order.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Name on Card</label>
                        <input
                          type="text"
                          required
                          value={paymentForm.cardName}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                          placeholder="Johnathan Doe"
                          className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={paymentForm.cardNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                              const matches = val.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || "";
                              const parts = [];
                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }
                              if (parts.length > 0) {
                                setPaymentForm({ ...paymentForm, cardNumber: parts.join(" ") });
                              } else {
                                setPaymentForm({ ...paymentForm, cardNumber: val });
                              }
                            }}
                            maxLength={19}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 pl-11 text-sm text-foreground focus:outline-none focus:border-primary transition"
                          />
                          <CreditCard className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={paymentForm.expDate}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, "");
                              if (val.length > 2) {
                                val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
                              }
                              setPaymentForm({ ...paymentForm, expDate: val });
                            }}
                            maxLength={5}
                            placeholder="MM/YY"
                            className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">CVV</label>
                          <input
                            type="password"
                            required
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value.replace(/\D/g, "") })}
                            maxLength={3}
                            placeholder="•••"
                            className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg cursor-pointer"
                  >
                    {paymentMethod === "upi" ? "Confirm Order" : "Place Order"} — ₹{grandTotal.toLocaleString("en-IN")}
                  </button>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-card p-8 md:p-12 rounded-lg border border-emerald-500/20 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-pulse" />
                </div>
                
                <h2 className="font-display text-3xl uppercase tracking-wider text-foreground">Order Confirmed</h2>
                <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                  Thank you for shopping with us, <span className="text-foreground font-semibold">{shippingForm.firstName}</span>. 
                  Your order has been received and is being prepared for our 48-hour express shipping.
                </p>

                <div className="glass-card max-w-sm mx-auto my-8 p-5 border border-white/5 text-left divide-y divide-white/5 space-y-3">
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">Order Reference</span>
                    <span className="text-foreground font-mono font-bold tracking-wider">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 pb-1">
                    <span className="text-muted-foreground">Delivery Method</span>
                    <span className="text-foreground font-medium">48h Express Shipping</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 pb-1">
                    <span className="text-muted-foreground">Shipping To</span>
                    <span className="text-foreground font-medium text-right line-clamp-1">{shippingForm.city}, {shippingForm.state}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/shop"
                    className="rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition shadow-lg"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/"
                    className="rounded-full border border-white/20 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Sticky Summary Panel */}
        {step !== "success" && (
          <aside>
            <div className="sticky top-24 border border-white/10 rounded-lg p-6 bg-card space-y-6">
              <h2 className="font-display text-lg uppercase tracking-wider text-foreground">Order Summary</h2>
              
              {/* Cart items list */}
              <div className="divide-y divide-white/5 max-h-60 overflow-y-auto scrollbar-thin pr-1 space-y-4">
                {cart.map((item) => (
                  <div key={`${item.product.handle}-${item.size}`} className="flex gap-4 pt-4 first:pt-0">
                    <div className="aspect-[3/4] w-12 overflow-hidden rounded bg-white/5 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h4 className="text-xs font-semibold text-foreground line-clamp-1">{item.product.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-medium text-foreground self-center">{formatPrice(item.product)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated GST (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-semibold text-foreground">
                  <span>Total</span>
                  <span className="font-display text-base text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="bg-white/5 rounded p-4 text-[10px] text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground uppercase tracking-wider mb-1">Return Policy</p>
                <p>Eligible for returns within 30 days of purchase. Return shipping is free. Box and product tags must remain intact.</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
