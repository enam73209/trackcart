"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { pushGtmEvent } from "../lib/gtm";

export default function PromotionBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredView.current) {
            hasTriggeredView.current = true;
            pushGtmEvent("view_promotion", {
              promotion_id: "SUMMER20",
              promotion_name: "Summer Sale 20% Off",
              creative_name: "summer_banner",
              creative_slot: "homepage_hero",
            });
            // Stop observing once viewed
            if (bannerRef.current) {
              observer.unobserve(bannerRef.current);
            }
          }
        });
      },
      { threshold: 0.2 } // trigger when 20% of the banner is visible
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  const handleShopNowClick = () => {
    pushGtmEvent("select_promotion", {
      promotion_id: "SUMMER20",
      promotion_name: "Summer Sale 20% Off",
      creative_name: "summer_banner",
      creative_slot: "homepage_hero",
    });
  };

  return (
    <div
      ref={bannerRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-cyan-900/40 to-blue-900/40 border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md"
    >
      {/* Glowing effect inside banner */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 mb-4 border border-cyan-500/20">
          Limited Time Offer
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Summer Sale — 20% OFF
        </h2>
        <p className="mt-2 text-gray-300 text-sm sm:text-base">
          Upgrade your sound. Use code{" "}
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-cyan-300 font-bold border border-white/5">
            SUMMER20
          </span>
        </p>
      </div>

      <div className="relative z-10 flex-shrink-0">
        <a
          href="#products"
          onClick={handleShopNowClick}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#030014] px-8 py-4 text-sm font-semibold hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
        >
          Shop Now
          <ArrowRight className="h-4 w-4 text-[#030014]" />
        </a>
      </div>
    </div>
  );
}
