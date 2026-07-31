import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { products } from "./data/products";

export default function Home() {
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
      <Navbar />

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
              Discover premium audio gadgets engineered for absolute clarity,
              immersive spatial sound, and total noise isolation. Feel every
              beat.
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
              <a
                href="https://trackcart-checkout.vercel.app"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Checkout Page
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
                <h3 className="font-semibold text-white">
                  Free Express Delivery
                </h3>
                <p className="text-xs text-gray-400">
                  Ships within 24 hours worldwide
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">2 Year Warranty</h3>
                <p className="text-xs text-gray-400">
                  Full hardware replacement protection
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">30-Day Guarantee</h3>
                <p className="text-xs text-gray-400">
                  Hassle-free returns & refunds
                </p>
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
              Pick your sound weapon of choice. Premium engineering, zero
              compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
