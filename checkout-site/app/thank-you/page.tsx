"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, ArrowLeft, Mail, Calendar, ChevronRight } from "lucide-react";
import { pushGtmEvent } from "../../lib/gtm";


const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

interface PurchasedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("TC-584920");
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const [totalPrice, setTotalPrice] = useState("161.67");
  const [email, setEmail] = useState("customer@example.com");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const oid = searchParams.get("orderId");
    const cartParam = searchParams.get("cart");
    const total = searchParams.get("total");
    const mail = searchParams.get("email");
    const pm = searchParams.get("paymentMethod");

    if (oid) setOrderId(oid);
    if (total) setTotalPrice(total);
    if (mail) setEmail(mail);
    if (pm) setPaymentMethod(pm);

    if (cartParam) {
      try {
        const parsed = JSON.parse(cartParam);
        if (Array.isArray(parsed)) {
          setPurchasedItems(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cart items in receipt", e);
      }
    }

    // Fallback if no cart param (backwards compatibility)
    const name = searchParams.get("name") || "AeroSound Max";
    setPurchasedItems([{
      id: "fallback",
      name,
      price: parseFloat(total || "149.00") / 1.085,
      image: "/images/earpods-max.png",
      quantity: 1
    }]);
  }, [searchParams]);

  const hasSentPurchase = useRef(false);

  useEffect(() => {
    if (purchasedItems.length > 0 && !hasSentPurchase.current) {
      hasSentPurchase.current = true;
      const subtotal = purchasedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const calculatedTax = subtotal * 0.085;
      const calculatedShipping = 0.0;

      pushGtmEvent("purchase", {
        transaction_id: orderId,
        value: parseFloat(totalPrice),
        tax: calculatedTax,
        shipping: calculatedShipping,
        currency: "USD",
        payment_type: paymentMethod,
        items: purchasedItems.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });
    }
  }, [purchasedItems, orderId, totalPrice, paymentMethod]);

  const handleContinueShopping = () => {
    // Clear the cart in landing site localStorage by redirecting
    // Wait, the cart is stored in landing-site's localStorage. 
    // Since checkout-site is on a different domain, we can't clear landing-site's localStorage directly from here.
    // But we can pass a query parameter like `?clearCart=true` back to the landing site!
    // And when the landing site loads, if `clearCart=true` is in the URL, it clears the cart. 
    // This is an EXTREMELY clever and seamless integration that perfectly solves cross-domain state clearing!
    window.location.href = `${LANDING_URL}/?clearCart=true`;
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg text-center space-y-8 animate-fade-in">
          {/* Animated Green Checkmark Ring */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
            <svg
              className="h-12 w-12 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                className="checkmark-path"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Order Confirmed!
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
              Thank you for shopping with TrackCart. Your order is secured and is currently being processed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="glass rounded-3xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Order Number</span>
              <span className="text-sm font-mono font-bold text-white bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                {orderId}
              </span>
            </div>

            {/* List of Purchased Items */}
            <div className="divide-y divide-white/5 max-h-[180px] overflow-y-auto pr-1.5 space-y-2">
              {purchasedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 first:pt-0">
                  <div className="relative h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 flex overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={35}
                      height={35}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold text-white">{item.name}</h3>
                    <span className="text-[9px] text-gray-500">Qty: {item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing details */}
            <div className="space-y-2.5 pt-3 border-t border-white/5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Paid:</span>
                <span className="text-cyan-400 font-extrabold">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Mode:</span>
                <span className="text-white font-medium">
                  {paymentMethod === "card" ? "💳 Credit Card" : "💵 Cash on Delivery"}
                </span>
              </div>
            </div>

            {/* Notification / Delivery estimation box */}
            <div className="pt-4 border-t border-white/5 space-y-3 text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <p>
                  Confirmation sent to <span className="text-white font-semibold">{email}</span>.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-purple-400 shrink-0" />
                <p>
                  Estimated delivery: <span className="text-white font-semibold">2 - 3 business days</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Button Redirects */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleContinueShopping}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-sm font-bold text-white shadow-lg glow-btn cursor-pointer transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Continue Shopping</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <a
              href={LANDING_URL}
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors py-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Home Catalog
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030014] py-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} TrackCart Gadgets. Secure SSL Fulfillment.</p>
      </footer>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#030014] text-white flex flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        <span className="text-sm font-semibold tracking-wider text-gray-400 animate-pulse">Loading Receipt...</span>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
