"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../app/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-45 w-full border-b border-white/5 bg-[#030014]/70 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 shadow-md group-hover:scale-105 transition-transform">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Track<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Cart</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link href="/#products" className="hover:text-cyan-400 transition-colors">Catalog</Link>
          <Link href="/#features" className="hover:text-cyan-400 transition-colors">Features</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#products"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/5 transition-all"
          >
            Browse Shop
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 text-gray-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white ring-2 ring-[#030014] animate-scale-in">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
