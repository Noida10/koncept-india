"use client";
import { useState, useEffect, useCallback } from "react";

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

  return (
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
  );
}
