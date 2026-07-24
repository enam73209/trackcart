"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Lock,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../context/CartContext";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL;

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart();

  const shipping = 0.0;
  const tax = cartTotal * 0.085; // 8.5% sales tax
  const total = cartTotal + shipping + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const params = new URLSearchParams({
      cart: JSON.stringify(cart),
    });
    window.location.href = `${CHECKOUT_URL}/?${params.toString()}`;
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
      {/* Glow Backdrops */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl w-full px-6 py-12 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
          <span>Shopping Cart</span>
          <span className="text-sm font-normal text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </span>
        </h1>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="glass rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 my-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                Your cart is empty
              </h2>
              <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                Add some premium wireless gadget devices to your cart to
                redefine your sound experience.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:glow-cyan transition-all"
            >
              Browse Shop
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          /* Cart List & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="glass rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 flex overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-base font-bold text-white">
                      {item.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      Unit Price: ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      title="Decrease Quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      title="Increase Quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="w-24 text-center sm:text-right font-semibold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary Checkout Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass rounded-3xl p-6 sm:p-8 space-y-6">
                <h2 className="text-lg font-bold text-white border-b border-white/5 pb-4">
                  Order Summary
                </h2>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">
                      ${cartTotal.toFixed(2)}
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
                    <span>Grand Total</span>
                    <span className="text-cyan-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-sm font-bold text-white shadow-lg glow-btn cursor-pointer transition-all"
                >
                  <Lock className="h-4 w-4" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500 text-center font-medium">
                  <span>🛡</span>
                  <span>Secure SSL Checkout Protection</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
