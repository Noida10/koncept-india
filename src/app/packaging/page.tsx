import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import PageBackground from "@/components/PageBackground";
import ServiceItemCard from "@/components/ServiceItemCard";

export const metadata: Metadata = {
  title: "Packaging Solutions",
  description:
    "Premium packaging, corporate gifting, and handcrafted leather products. Luxury rigid boxes, eco-friendly solutions, and bespoke designs.",
};

export default function PackagingPage() {
  const content = getContent();
  const { packaging, pageBackgrounds } = content;
  const bg = pageBackgrounds?.packaging;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: packaging.bannerImage
              ? `url('${packaging.bannerImage}')`
              : undefined,
            backgroundColor: packaging.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {packaging.title}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {packaging.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packaging.categories.map((category, catIdx) => (
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
            Need custom packaging solutions?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            We specialize in luxury packaging, corporate gifts, and leather products tailored to your brand.
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
