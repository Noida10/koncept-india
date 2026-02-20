"use client";

import { useState } from "react";

export default function ServiceItemCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = image && !imgError;

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-amber-200 hover:shadow-md transition-all">
      {/* Image area */}
      <div className="relative w-full h-[120px] overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-300"
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
          </div>
        )}
      </div>

      {/* Name */}
      <div className="p-3 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-amber-700 rounded-full shrink-0 group-hover:scale-125 transition-transform"></div>
        <span className="text-gray-700 font-medium text-sm">{name}</span>
      </div>
    </div>
  );
}
