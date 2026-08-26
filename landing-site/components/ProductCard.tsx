"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../app/data/products";
import { useCart } from "../app/context/CartContext";
import { pushGtmEvent } from "../lib/gtm";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    pushGtmEvent("select_item", {
      item_list_id: "featured_products",
      item_list_name: "Featured Sound Gadgets",
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: 1,
        },
      ],
    });
    router.push(`/product-details/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    addToCart(product);
    pushGtmEvent("add_to_cart", {
      currency: "USD",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: 1,
        },
      ],
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 p-6 glass-hover cursor-pointer"
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
        <button
          onClick={handleAddToCart}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-sm font-semibold text-white shadow-md hover:glow-cyan hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
