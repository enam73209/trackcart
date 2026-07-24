"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Info, ArrowRight, ShieldCheck, Truck, RefreshCw, X, Play } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  specs: { [key: string]: string };
  badge?: string;
  color: string;
}

const products: Product[] = [
  {
    id: "aerosound-max",
    name: "AeroSound Max",
    price: 149.00,
    description: "True wireless earpods with adaptive active noise cancellation, high-fidelity spatial audio, and up to 40 hours of battery life.",
    image: "/images/earpods-max.png",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    color: "from-cyan-500/20 to-blue-500/20",
    features: [
      "Adaptive Active Noise Cancellation",
      "Spatial Audio with Dynamic Head Tracking",
      "IPX4 Sweat and Water Resistance",
      "MagSafe Compatible Wireless Charging"
    ],
    specs: {
      "Driver Size": "11mm Dynamic Driver",
      "Frequency Range": "20Hz - 20kHz",
      "Battery Life": "Up to 8 hours (40 hours with charging case)",
      "Connectivity": "Bluetooth 5.3",
      "Weight (Each)": "5.4g"
    }
  },
  {
    id: "sonicwave-pro",
    name: "SonicWave Pro",
    price: 299.00,
    description: "Professional studio-grade over-ear headphones with custom acoustic platforms, ultra-plush cushions, and lossless audio support.",
    image: "/images/sonicwave-pro.png",
    rating: 4.9,
    reviews: 86,
    badge: "Premium Choice",
    color: "from-purple-500/20 to-pink-500/20",
    features: [
      "Lossless Audio playback via USB-C or 3.5mm",
      "Ultra-Plush Memory Foam Ear Cushions",
      "Integrated Custom DAC & Amplifier",
      "Up to 50 hours of wireless listening"
    ],
    specs: {
      "Driver Size": "40mm Custom Acoustical Driver",
      "Frequency Range": "10Hz - 40kHz (Hi-Res Certified)",
      "Battery Life": "Up to 50 hours with Fast Fuel (10 min = 5 hours)",
      "Connectivity": "Bluetooth 5.2 / USB-C Lossless / 3.5mm Aux",
      "Weight": "260g"
    }
  },
  {
    id: "basspulse-go",
    name: "BassPulse Go",
    price: 79.00,
    description: "Waterproof neckband-style sport earphones with heavy bass tuning, secure-fit earhooks, and magnetic auto-pause earplugs.",
    image: "/images/basspulse-go.png",
    rating: 4.6,
    reviews: 215,
    badge: "Sport Edition",
    color: "from-emerald-500/20 to-teal-500/20",
    features: [
      "Extra Bass Deep Resonance Chamber",
      "IPX7 Fully Waterproof Construction",
      "Secure-Fit Comfort Earhooks",
      "Magnetic Earbuds for Auto-Pause/Resume"
    ],
    specs: {
      "Driver Size": "10mm Neodymium Driver",
      "Frequency Range": "20Hz - 20kHz",
      "Battery Life": "Up to 18 hours",
      "Connectivity": "Bluetooth 5.1 with Multipoint Support",
      "Weight": "28g"
    }
  }
];

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "http://localhost:3001";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleBuyNow = (product: Product) => {
    const params = new URLSearchParams({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    window.location.href = `${CHECKOUT_URL}/?${params.toString()}`;
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 flex flex-col font-sans">
      {/* Glow Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 py-2 px-4 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
        ⚡ Launch Offer: Free Express Shipping Worldwide on All Orders!
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#030014]/70 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-md">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Track<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Cart</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#products" className="hover:text-cyan-400 transition-colors">Catalog</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#products"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/5 transition-all"
            >
              Browse Shop
            </a>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white ring-2 ring-[#030014]">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-cyan-400 font-medium mb-6">
              <span>Next-Gen Audio Experience</span>
              <ArrowRight className="h-3 w-3" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8">
              Future of Sound,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Redefined.
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-base sm:text-xl text-gray-400 leading-relaxed mb-10">
              Discover premium audio gadgets engineered for absolute clarity, immersive spatial sound, and total noise isolation. Feel every beat.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Shop Gadgets
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section id="features" className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Free Express Delivery</h3>
                <p className="text-xs text-gray-400">Ships within 24 hours worldwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">2 Year Warranty</h3>
                <p className="text-xs text-gray-400">Full hardware replacement protection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">30-Day Guarantee</h3>
                <p className="text-xs text-gray-400">Hassle-free returns & refunds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section id="products" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Featured Sound Gadgets
            </h2>
            <p className="mx-auto max-w-lg text-sm sm:text-base text-gray-400">
              Pick your sound weapon of choice. Premium engineering, zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 p-6 glass-hover"
              >
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {product.badge}
                  </span>
                )}

                {/* Product Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] mb-6 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="relative object-contain transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-1 mb-3">
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
                  <span className="text-xs font-semibold text-white ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Product Details */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Bottom Row */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-xs text-gray-400">Price</span>
                    <span className="text-2xl font-black text-white">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-sm font-semibold text-white shadow-md hover:glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030014] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center gap-3 mb-6 sm:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-white">TrackCart</span>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TrackCart Gadgets Inc. All rights reserved. Secure SSL Checkout.
          </p>
        </div>
      </footer>

      {/* Product Detail Dialog Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          {/* Modal Card */}
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#08051e] border border-white/10 shadow-2xl flex flex-col md:flex-row animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: Product Image Showcase */}
            <div className="relative md:w-1/2 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedProduct.color} opacity-20`} />
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={260}
                height={260}
                className="relative object-contain"
              />
              {selectedProduct.badge && (
                <span className="absolute bottom-4 left-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-400">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Right Column: Specifications & Content */}
            <div className="md:w-1/2 p-8 flex flex-col max-h-[85vh] overflow-y-auto">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">TrackCart Gadgets</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{selectedProduct.name}</h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-white">${selectedProduct.price.toFixed(2)}</span>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">In Stock</span>
              </div>

              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">Key Highlights</h4>
                <ul className="space-y-1.5">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-cyan-400 mt-0.5">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2.5">Specifications</h4>
                <div className="rounded-xl bg-white/[0.02] border border-white/5 divide-y divide-white/5 overflow-hidden">
                  {Object.entries(selectedProduct.specs).map(([label, val]) => (
                    <div key={label} className="flex items-center justify-between p-3 text-xs">
                      <span className="text-gray-500 font-medium">{label}</span>
                      <span className="text-gray-300 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase font-semibold">Total Price</span>
                  <span className="text-xl font-bold text-white">${selectedProduct.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleBuyNow(selectedProduct)}
                  className="flex-grow inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3.5 text-sm font-bold text-white shadow-lg hover:glow-cyan transition-all"
                >
                  Buy Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
