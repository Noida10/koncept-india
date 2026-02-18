"use client";
import CountUp from "@/components/CountUp";

const stats = [
  { end: 15, suffix: "+", label: "Years of Experience" },
  { end: 500, suffix: "+", label: "Projects Delivered" },
  { end: 100, suffix: "+", label: "Happy Clients" },
  { end: 6, suffix: "+", label: "Printing Technologies" },
];

export default function AboutStats() {
  return (
    <div className="bg-gradient-to-br from-[#c6d1f0] to-[#7691da]/30 rounded-2xl p-8 lg:p-12">
      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <CountUp
              end={stat.end}
              suffix={stat.suffix}
              className="text-3xl font-bold text-[#2755c5] min-w-[80px]"
            />
            <span className="text-gray-700 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
