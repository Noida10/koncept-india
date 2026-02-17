import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery & Portfolio",
  description:
    "View our portfolio of luxury packaging, eco-friendly hotel amenities, custom bags, and premium leather products.",
};

export default function GalleryPage() {
  const { gallery } = getContent();

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{gallery.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl">{gallery.subtitle}</p>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gallery.categories.map((category) => (
              <div
                key={category.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
              >
                {/* Placeholder for images - shows a styled card */}
                <div className="h-56 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  {category.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                      {category.images.slice(0, 4).map((img, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`${category.name} ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <svg
                        className="w-16 h-16 text-amber-400 mx-auto mb-3"
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
                      <p className="text-amber-600 text-sm font-medium">
                        Images coming soon
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note for admin */}
          <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <p className="text-amber-800 font-medium">
              Portfolio images can be managed through the{" "}
              <a href="/admin/login" className="underline">
                Admin Panel
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
