"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const portfolioImages = [
  {
    src: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=600&auto=format&fit=crop",
    alt: "Luxury rigid box",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=600&auto=format&fit=crop",
    alt: "Gift packaging",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop",
    alt: "Premium packaging",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238f581?q=80&w=600&auto=format&fit=crop",
    alt: "Custom gift set",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop",
    alt: "Hotel amenity kit",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    alt: "Custom bags",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    alt: "Leather products",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
    alt: "Corporate stationery",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    alt: "Eco-friendly products",
    span: "col-span-1 row-span-1",
  },
];

export default function PortfolioGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Work
          </h2>
          <div className="w-20 h-1 bg-amber-700 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A showcase of premium printing, packaging, and gifting solutions
            crafted for leading brands.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {portfolioImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative aspect-square w-full overflow-hidden rounded-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + portfolioImages.length) % portfolioImages.length);
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <img
            src={portfolioImages[lightbox].src.replace("w=600", "w=1200")}
            alt={portfolioImages[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % portfolioImages.length);
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
