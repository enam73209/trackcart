import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
