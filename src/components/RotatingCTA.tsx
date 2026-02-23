"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type RotatingCTAProps = {
  words: string[];
  titlePrefix: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
};

export default function RotatingCTA({ words, titlePrefix, subtitle, buttonText, buttonHref }: RotatingCTAProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <section className="py-16 sm:py-20 bg-[#1B3A88] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {titlePrefix}{" "}
          <span
            className={`inline-block text-amber-400 transition-all duration-400 ${
              animating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {words[index]}
          </span>
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
        >
          {buttonText}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
