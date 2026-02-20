import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";
import ServiceItemCard from "@/components/ServiceItemCard";

export const metadata: Metadata = {
  title: "Printing Services",
  description:
    "High-quality printing solutions — Offset, Digital, Screen, UV & Leaf Printing. Corporate stationery, brochures, catalogues, and more.",
};

export default function PrintingPage() {
  const content = getContent();
  const { printing, pageBackgrounds } = content;
  const bg = pageBackgrounds?.printing;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: printing.bannerImage
              ? `url('${printing.bannerImage}')`
              : undefined,
            backgroundColor: printing.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {printing.title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {printing.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {printing.categories.map((category, catIdx) => (
            <div
              key={category.id}
              id={category.id}
              className={catIdx > 0 ? "mt-16 pt-16 border-t border-gray-200" : ""}
            >
              <ScrollReveal>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {category.name}
                  </h2>
                  <div className="w-16 h-1 bg-amber-700 mb-4"></div>
                  <p className="text-gray-600 text-lg">{category.description}</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((item, i) => (
                  <ScrollReveal key={item.name} delay={i * 50}>
                    <ServiceItemCard name={item.name} image={item.image} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need custom printing solutions?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            We specialize in bespoke printing tailored to your brand identity with precision and excellence.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </PageBackground>
  );
}
