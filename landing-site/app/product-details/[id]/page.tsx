"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, ArrowRight, ShieldCheck, Truck, RefreshCw, Check } from "lucide-react";
import { useState, useMemo } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "http://localhost:3001";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { cart, addToCart } = useCart();
  const [addedMessage, setAddedMessage] = useState(false);

  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center py-24 px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-sm">
            We couldn't find the audio gadget you are looking for. It may have been discontinued or out of stock.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:glow-cyan transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const buyNowUrl = useMemo(() => {
    if (!product) return "";
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) {
      updatedCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    const urlParams = new URLSearchParams({
      cart: JSON.stringify(updatedCart),
    });
    return `${CHECKOUT_URL}/?${urlParams.toString()}`;
  }, [cart, product]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
      {/* Glow Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />

      <main className="flex-grow mx-auto max-w-7xl w-full px-6 py-12 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop Catalog
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Display */}
          <div className="lg:col-span-6 relative aspect-square w-full rounded-3xl bg-gradient-to-br from-white/5 to-transparent p-12 flex flex-col items-center justify-center overflow-hidden border border-white/5">
            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20`} />
            <Image
              src={product.image}
              alt={product.name}
              width={350}
              height={350}
              className="relative object-contain transition-transform duration-500 hover:scale-105"
              priority
            />
            {product.badge && (
              <span className="absolute bottom-6 left-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 text-xs font-semibold text-cyan-400">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Spec Sheet & Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                TrackCart Premium
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                {product.name}
              </h1>

              {/* Ratings Row */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 fill-current ${
                        i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-xs text-gray-400">{product.reviews} customer reviews</span>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  Free Express Delivery
                </span>
              </div>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex-grow inline-flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 py-4 px-6 text-sm font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                {addedMessage ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
                    <span className="text-emerald-400">Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Shopping Cart</span>
                  </>
                )}
              </button>
              <Link
                href={buyNowUrl}
                onClick={handleBuyNow}
                className="w-full sm:w-auto flex-grow inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 px-6 text-sm font-bold text-white shadow-lg glow-btn cursor-pointer transition-all"
              >
                <span>Buy Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Highlights */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-400">
                    <span className="text-cyan-400 mt-0.5 font-bold">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Specs */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="rounded-2xl bg-white/[0.02] border border-white/5 divide-y divide-white/5 overflow-hidden">
                {Object.entries(product.specs).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between p-3.5 text-xs sm:text-sm">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <span className="text-gray-300 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
