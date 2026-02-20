"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type HeroProduct = {
  title: string;
  tagline: string;
  image: string;
  href: string;
};

const gradients = [
  "from-amber-600 to-amber-800",
  "from-slate-600 to-slate-800",
  "from-rose-600 to-rose-800",
  "from-emerald-600 to-emerald-800",
  "from-indigo-600 to-indigo-800",
];

export default function HeroProductCarousel({ products }: { products: HeroProduct[] }) {
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [products.length, goNext]);

  if (products.length === 0) return null;

  const current = products[active];

  return (
    <>
      {/* Background images */}
      <div className="absolute inset-0">
        {products.map((product, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/40" />

      {/* Text content — synced with active slide */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full">
        <div className="max-w-2xl">
          <h1
            key={`title-${active}`}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
          >
            {current.title}
          </h1>
          <p
            key={`tagline-${active}`}
            className="text-base sm:text-lg mb-8 leading-relaxed max-w-xl text-gray-300 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            {current.tagline}
          </p>
          <div
            key={`cta-${active}`}
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href={current.href}
              className="inline-flex items-center px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
            >
              Explore
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold rounded-lg transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        {products.length > 1 && (
          <div className="flex gap-2 mt-8">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-amber-500" : "w-4 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
