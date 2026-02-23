import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "Explore our comprehensive range of printing services, corporate gifting, leather products, and custom packaging solutions. Premium Corporate Gifting Delhi, Custom Packaging Boxes.",
};

export default function ProductsPage() {
  const { products } = getContent();

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{products.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{products.subtitle}</p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.categories.map((category, catIdx) => (
            <div
              key={category.id}
              id={category.id}
              className={catIdx > 0 ? "mt-16 pt-16 border-t border-gray-200" : ""}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {category.name}
                </h2>
                <div className="w-16 h-1 bg-amber-700 mb-4"></div>
                <p className="text-gray-600 text-lg">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-amber-50 hover:shadow-sm transition-all border border-transparent hover:border-amber-200"
                  >
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
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
            Need a custom solution?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            We specialize in bespoke printing and packaging tailored to your brand identity.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </div>
  );
}
