"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const defaultProduct: CartItem = {
  id: "aerosound-max",
  name: "AeroSound Max",
  price: 149.0,
  image: "/images/earpods-max.png",
  quantity: 1,
};

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  // Parse product details or cart from query params
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("");

  // Card input states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Address inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const cartParam = searchParams.get("cart");
    if (cartParam) {
      try {
        const parsed = JSON.parse(cartParam);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cart parameter", e);
      }
    }

    // Fallback to single product parameters
    const id = searchParams.get("id") || defaultProduct.id;
    const name = searchParams.get("name") || defaultProduct.name;
    const priceStr =
      searchParams.get("price") || defaultProduct.price.toString();
    const image = searchParams.get("image") || defaultProduct.image;

    setItems([
      {
        id,
        name,
        price: parseFloat(priceStr),
        image,
        quantity: 1,
      },
    ]);
  }, [searchParams]);

  // Pricing calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0.0;
  const tax = subtotal * 0.085; // 8.5% sales tax
  const total = subtotal + shipping + tax;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.substring(0, 16);
    // Format card number with spaces (#### #### #### ####)
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    setCardExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCardCvv(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setSubmitStep("Securing checkout session...");

    setTimeout(() => {
      setSubmitStep("Processing details...");
      setTimeout(() => {
        setSubmitStep("Authorizing transaction...");
        setTimeout(() => {
          // Generate mock order details to pass to thank you page
          const orderId = "TC-" + Math.floor(100000 + Math.random() * 900000);
          const thankYouParams = new URLSearchParams({
            orderId,
            cart: JSON.stringify(items),
            total: total.toFixed(2),
            email,
            paymentMethod,
          });
          window.location.href = `/thank-you?${thankYouParams.toString()}`;
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
      {/* Background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 bg-[#030014]/50 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href={`${LANDING_URL}/cart`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </a>
          <span className="text-xl font-bold tracking-tight text-white">
            Track
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cart
            </span>{" "}
            Checkout
          </span>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-full shadow-inner">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure 256-Bit SSL</span>
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-grow mx-auto max-w-7xl w-full px-6 py-12 lg:px-8">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Side: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Info */}
            <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-xs font-extrabold text-cyan-400">
                  1
                </span>
                <h2 className="text-lg font-bold text-white">
                  Customer Information
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-input"
                    autoComplete="email"
                  />
                  <span className="error-message">
                    ❌ Please enter a valid email address.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-semibold text-gray-400"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    pattern="[0-9+\-\s]{7,15}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="form-input"
                    autoComplete="tel"
                  />
                  <span className="error-message">
                    ❌ Please enter a valid phone number.
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-xs font-extrabold text-cyan-400">
                  2
                </span>
                <h2 className="text-lg font-bold text-white">
                  Shipping Details
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-xs font-semibold text-gray-400"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="form-input"
                    autoComplete="name"
                  />
                  <span className="error-message">
                    ❌ Full Name is required.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="address"
                    className="text-xs font-semibold text-gray-400"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Audio Way"
                    className="form-input"
                    autoComplete="shipping street-address"
                  />
                  <span className="error-message">
                    ❌ Street Address is required.
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold text-gray-400"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Sound City"
                      className="form-input"
                      autoComplete="shipping address-level2"
                    />
                    <span className="error-message">❌ City is required.</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="zip"
                      className="text-xs font-semibold text-gray-400"
                    >
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      required
                      pattern="\d{5}(-\d{4})?|[A-Z\d\s\-]{3,10}"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="94043"
                      className="form-input"
                      autoComplete="shipping postal-code"
                    />
                    <span className="error-message">
                      ❌ Please enter a valid ZIP code.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-xs font-extrabold text-cyan-400">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Payment Method
                  </h2>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border text-sm font-semibold transition-all ${
                    paymentMethod === "card"
                      ? "bg-cyan-500/10 border-cyan-500 text-white"
                      : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border text-sm font-semibold transition-all ${
                    paymentMethod === "cod"
                      ? "bg-purple-500/10 border-purple-500 text-white"
                      : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-lg">💵</span>
                  Cash on Delivery
                </button>
              </div>

              {/* Cash on Delivery Details */}
              {paymentMethod === "cod" && (
                <div className="rounded-2xl bg-purple-500/5 border border-purple-500/20 p-5 text-sm text-purple-300 flex gap-3.5 items-start">
                  <span className="text-xl">ℹ</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Pay with Cash on Delivery
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      You will pay the courier in cash upon receiving your
                      items. Please ensure you have the exact amount available
                      on the day of delivery.
                    </p>
                  </div>
                </div>
              )}

              {/* Credit Card inputs & Visualizer */}
              {paymentMethod === "card" && (
                <div className="space-y-8 animate-fade-in">
                  {/* Virtual Credit Card Display */}
                  <div className="card-container w-full max-w-[340px] h-[200px] mx-auto">
                    <div
                      className={`card-inner relative w-full h-full rounded-2xl shadow-xl transition-transform duration-700 ${isCardFlipped ? "card-flipped" : ""}`}
                    >
                      {/* Card Front */}
                      <div className="card-front absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-white/10 text-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                              Secure Visa
                            </span>
                            <div className="h-6 w-9 rounded-md bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                              <div className="h-4 w-6 rounded bg-amber-500/40" />
                            </div>
                          </div>
                          <div className="text-right">
                            <Sparkles className="h-5 w-5 text-cyan-400 ml-auto animate-pulse" />
                          </div>
                        </div>
                        <div>
                          <div className="text-xl font-mono tracking-widest text-slate-100">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>
                        </div>
                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400">
                              Cardholder
                            </span>
                            <span className="font-bold font-mono tracking-wide max-w-[150px] truncate block">
                              {cardName.toUpperCase() || "YOUR NAME HERE"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400">
                              Expires
                            </span>
                            <span className="font-bold font-mono">
                              {cardExpiry || "MM/YY"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div className="card-back absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-white/10 text-white flex flex-col justify-between py-6">
                        <div className="w-full h-10 bg-black/60" />
                        <div className="px-6 flex justify-between items-center">
                          <div className="h-8 flex-grow bg-slate-800 rounded flex items-center px-3 text-xs font-mono italic text-slate-400 select-none">
                            Signature Panel
                          </div>
                          <div className="h-8 w-12 bg-white text-black font-mono font-bold flex items-center justify-center rounded-r text-sm">
                            {cardCvv || "•••"}
                          </div>
                        </div>
                        <div className="px-6 text-[8px] text-slate-400 leading-normal">
                          This is a demo secure virtual visualization card.
                          Standard security protocols are simulated for demo
                          validation purposes.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card input forms */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="cardName"
                        className="text-xs font-semibold text-gray-400"
                      >
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        required={paymentMethod === "card"}
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="form-input"
                        onFocus={() => setIsCardFlipped(false)}
                      />
                      <span className="error-message">
                        ❌ Cardholder name is required.
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="cardNumber"
                        className="text-xs font-semibold text-gray-400"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        required={paymentMethod === "card"}
                        pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        className="form-input"
                        onFocus={() => setIsCardFlipped(false)}
                      />
                      <span className="error-message">
                        ❌ Please enter a valid 16-digit card number.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="cardExpiry"
                          className="text-xs font-semibold text-gray-400"
                        >
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          required={paymentMethod === "card"}
                          pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="form-input"
                          onFocus={() => setIsCardFlipped(false)}
                        />
                        <span className="error-message">
                          ❌ Expiry MM/YY required.
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="cardCvv"
                          className="text-xs font-semibold text-gray-400"
                        >
                          CVV / CVC
                        </label>
                        <input
                          type="text"
                          id="cardCvv"
                          required={paymentMethod === "card"}
                          pattern="\d{3}"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          className="form-input"
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                        />
                        <span className="error-message">
                          ❌ Valid 3-digit CVV required.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-white/5 pb-4">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto pr-2 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-3 first:pt-0"
                  >
                    <div className="relative h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 flex overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xs font-bold text-white">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-gray-500">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/5 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax (8.5%)</span>
                  <span className="text-white font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-4 text-base font-extrabold text-white">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-sm font-bold text-white shadow-lg glow-btn cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{submitStep}</span>
                  </div>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Confirm Order • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="pt-2 flex flex-col gap-3 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-400 font-medium">
                  <span>🛡</span>
                  <span>SSL Encrypted Checkout Security Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  By clicking Confirm Order, you authorize this demo simulation
                  transaction of your purchase. No actual money will be charged.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030014] py-8 text-center text-xs text-gray-500 mt-auto">
        <p>
          © {new Date().getFullYear()} TrackCart Checkout Portal. Powered by
          Secure SSL.
        </p>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030014] text-white flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <span className="text-sm font-semibold tracking-wider text-gray-400 animate-pulse">
            Initializing Checkout...
          </span>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
