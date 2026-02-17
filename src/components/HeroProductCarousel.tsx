"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type HeroProduct = {
  title: string;
  tagline: string;
  image: string;
  href: string;
};

// Gradient backgrounds for products without images
const gradients = [
  "from-amber-600 to-amber-800",
  "from-slate-600 to-slate-800",
  "from-rose-600 to-rose-800",
  "from-emerald-600 to-emerald-800",
  "from-indigo-600 to-indigo-800",
];

// Product icons matching the themes
const productIcons = [
  // Box icon
  <svg key="box" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
  // Document icon
  <svg key="doc" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  // Leaf icon
  <svg key="leaf" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  // Briefcase icon
  <svg key="brief" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
  // Gift icon
  <svg key="gift" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>,
];

export default function HeroProductCarousel({ products }: { products: HeroProduct[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isAnimating || index === active) return;
      setDirection(dir);
      setIsAnimating(true);
      setActive(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [active, isAnimating]
  );

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      const next = (active + 1) % products.length;
      goTo(next, "next");
    }, 4000);
    return () => clearInterval(timer);
  }, [active, products.length, goTo]);

  if (products.length === 0) return null;

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      {/* Main showcase card */}
      <div className="relative h-80 sm:h-96">
        {products.map((product, i) => {
          const isActive = i === active;
          const slideClass = isActive
            ? "opacity-100 translate-y-0 scale-100"
            : direction === "next"
            ? "opacity-0 translate-y-8 scale-95"
            : "opacity-0 -translate-y-8 scale-95";

          return (
            <Link
              key={i}
              href={product.href}
              className={`absolute inset-0 transition-all duration-600 ease-out ${slideClass} ${
                isActive ? "pointer-events-auto z-10" : "pointer-events-none z-0"
              }`}
              style={{ transitionDuration: "600ms" }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      gradients[i % gradients.length]
                    } flex items-center justify-center`}
                  >
                    <div className="text-white/20 group-hover:text-white/30 transition-colors duration-500 transform group-hover:scale-110 transition-transform">
                      {productIcons[i % productIcons.length]}
                    </div>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Product info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{product.tagline}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Dots + navigation */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {/* Prev button */}
        <button
          onClick={() => goTo((active - 1 + products.length) % products.length, "prev")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Previous product"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? "next" : "prev")}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? "w-8 h-2 bg-amber-400"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to product ${i + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => goTo((active + 1) % products.length, "next")}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Next product"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Floating mini cards (thumbnails of next/prev) */}
      <div className="hidden lg:block">
        {/* Next card peek */}
        <div
          className="absolute -right-12 top-1/2 -translate-y-1/2 w-20 h-28 rounded-xl overflow-hidden opacity-40 shadow-lg cursor-pointer hover:opacity-60 transition-opacity"
          onClick={() => goTo((active + 1) % products.length, "next")}
        >
          {products[(active + 1) % products.length].image ? (
            <img
              src={products[(active + 1) % products.length].image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${
                gradients[(active + 1) % gradients.length]
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
