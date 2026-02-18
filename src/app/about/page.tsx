import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";
import AboutStats from "./AboutStats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Koncept India Enterprises — dedicated to quality printing, timely delivery, and innovative packaging solutions since inception.",
};

export default function AboutPage() {
  const { about } = getContent();

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#2755c5] to-[#7691da] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{about.title}</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Dedicated to excellence in printing, packaging, and corporate solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Company Overview</h2>
              <div className="w-16 h-1 bg-[#2755c5] mb-6"></div>
              {about.overview.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {p}
                </p>
              ))}
            </div>
            <AboutStats />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Capabilities"
            subtitle="State-of-the-art technology and skilled craftsmanship."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#2755c5] text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-600 leading-relaxed">{cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Vision & Mission"
            subtitle="Our guiding principles and commitment to excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {about.visionMission.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="w-2 h-2 bg-[#2755c5] rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
