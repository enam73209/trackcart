"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, ArrowLeft, CheckCircle, Mail, Calendar, CreditCard, ChevronRight } from "lucide-react";

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("TC-584920");
  const [productName, setProductName] = useState("AeroSound Max");
  const [totalPrice, setTotalPrice] = useState("161.67");
  const [email, setEmail] = useState("customer@example.com");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const oid = searchParams.get("orderId");
    const name = searchParams.get("name");
    const total = searchParams.get("total");
    const mail = searchParams.get("email");
    const pm = searchParams.get("paymentMethod");

    if (oid) setOrderId(oid);
    if (name) setProductName(name);
    if (total) setTotalPrice(total);
    if (mail) setEmail(mail);
    if (pm) setPaymentMethod(pm);
  }, [searchParams]);

  const handleContinueShopping = () => {
    window.location.href = LANDING_URL;
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

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-gray-400">Items Ordered:</span>
                <span className="text-white font-semibold text-right max-w-[200px] truncate">{productName} (Qty: 1)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount Charged:</span>
                <span className="text-cyan-400 font-extrabold">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment:</span>
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
