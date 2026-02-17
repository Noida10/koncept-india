"use client";
import { useState, useCallback, useEffect } from "react";

type GalleryCategory = {
  id: string;
  name: string;
  description: string;
  images: string[];
};

export default function GalleryLightbox({ categories }: { categories: GalleryCategory[] }) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openCategory = categories.find((c) => c.id === openCategoryId);
  const images = openCategory?.images ?? [];

  const close = useCallback(() => {
    setOpenCategoryId(null);
    setCurrentIndex(0);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!openCategoryId) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [openCategoryId, close, goNext, goPrev]);

  return (
    <>
      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all ${
              category.images.length > 0 ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (category.images.length > 0) {
                setOpenCategoryId(category.id);
                setCurrentIndex(0);
              }
            }}
          >
            <div className="h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              {category.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                  {category.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${category.name} ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <svg
                    className="w-16 h-16 text-amber-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  <p className="text-amber-600 text-sm font-medium">Images coming soon</p>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 leading-relaxed">{category.description}</p>
              {category.images.length > 0 && (
                <p className="text-amber-700 text-sm font-medium mt-3 group-hover:text-amber-800 transition-colors">
                  View {category.images.length} image{category.images.length !== 1 ? "s" : ""} &rarr;
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {openCategoryId && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category name & counter */}
          <div className="absolute top-4 left-4 text-white">
            <p className="font-semibold text-lg">{openCategory?.name}</p>
            <p className="text-white/60 text-sm">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`${openCategory?.name} ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
