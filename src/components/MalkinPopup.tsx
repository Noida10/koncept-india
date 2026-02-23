"use client";

import { useState, useEffect } from "react";

const popups = [
  {
    image: true,
    title: "👑 The Actual MALKIN 👑",
    subtitle: "Boss of the Boss",
  },
  {
    image: false,
    title: "🤨 Really? You dare to close me?",
    subtitle: "Himmat kaise hui tumhari! 😤",
  },
  {
    image: false,
    title: "😂 Arre baap re! Phir se band kiya?",
    subtitle: "Chalo ab kaam karo! 🫡",
  },
];

export default function MalkinPopup() {
  const [stage, setStage] = useState(-1); // -1 = waiting, 0/1/2 = popup index
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (today !== "2026-02-23") return;
    if (sessionStorage.getItem("malkin_done")) return;
    const timer = setTimeout(() => {
      setStage(0);
      setVisible(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (stage < 2) {
        setStage(stage + 1);
        setVisible(true);
      } else {
        setStage(-1);
        sessionStorage.setItem("malkin_done", "1");
      }
    }, 400);
  };

  if (stage < 0 || stage > 2 || !visible) return null;

  const popup = popups[stage];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      style={{ animation: "fadeIn 0.4s ease-out" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0.5) rotate(-5deg); opacity: 0; }
          60% { transform: scale(1.05) rotate(1deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-[90%] overflow-hidden border-4 border-amber-500"
        style={{ animation: "popIn 0.5s ease-out" }}
      >
        {/* Decorative top bar */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

        <div className="p-6 sm:p-8 text-center">
          {/* Crown decoration */}
          <div className="text-5xl mb-4">👑</div>

          {popup.image && (
            <div className="mb-6 relative">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-amber-400 shadow-lg shadow-amber-200">
                <img
                  src="/images/malkin.png"
                  alt="The Actual Malkin"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Sparkle effects */}
              <div className="absolute top-2 left-1/4 text-2xl animate-bounce">✨</div>
              <div className="absolute top-4 right-1/4 text-xl animate-bounce" style={{ animationDelay: "0.3s" }}>✨</div>
              <div className="absolute bottom-2 right-1/3 text-2xl animate-bounce" style={{ animationDelay: "0.6s" }}>💎</div>
            </div>
          )}

          {!popup.image && (
            <div className="text-7xl mb-4">
              {stage === 1 ? "😤" : "😂"}
            </div>
          )}

          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-2"
            style={{
              background: "linear-gradient(90deg, #b45309, #d97706, #f59e0b, #d97706, #b45309)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}
          >
            {popup.title}
          </h2>

          <p className="text-gray-600 text-lg font-medium mb-6">
            {popup.subtitle}
          </p>

          <button
            onClick={handleClose}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-full hover:from-amber-700 hover:to-amber-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {stage === 0 && "Okay okay, band karo! ❌"}
            {stage === 1 && "Haan haan, sorry! 🙏"}
            {stage === 2 && "Jai Malkin! 🙌"}
          </button>

          {stage < 2 && (
            <p className="mt-3 text-xs text-gray-400">
              {stage === 0 ? "⚠️ Close at your own risk..." : "⚠️ Last warning..."}
            </p>
          )}
        </div>

        {/* Decorative bottom bar */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
      </div>
    </div>
  );
}
