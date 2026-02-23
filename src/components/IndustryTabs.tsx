"use client";
import { useState } from "react";

type Industry = {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

type IndustryTabsProps = {
  sectionTitle: string;
  sectionSubtitle: string;
  items: Industry[];
};

export default function IndustryTabs({ sectionTitle, sectionSubtitle, items }: IndustryTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = items[activeTab];

  if (!items.length) return null;

  return (
    <section className="py-16 sm:py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {sectionTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {items.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                i === activeTab
                  ? "bg-amber-700 text-white shadow-lg shadow-amber-900/30"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div
            key={current.id}
            className="animate-fade-in-up"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              {current.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {current.description}
            </p>
            <ul className="space-y-3">
              {current.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-500 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            {items.map((ind, i) => (
              <img
                key={ind.id}
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === activeTab ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
