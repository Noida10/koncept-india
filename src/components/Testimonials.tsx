"use client";
import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

type Testimonial = {
  quote: string;
  author: string;
  company: string;
};

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
        </ScrollReveal>

        <div className="relative min-h-[220px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-in-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : "translateY(16px)",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              {/* Quote icon */}
              <svg
                className="w-10 h-10 text-amber-700/30 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 italic max-w-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-semibold text-gray-900">{t.author}</p>
              <p className="text-sm text-amber-700">{t.company}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === active ? "bg-amber-700" : "bg-gray-300"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
