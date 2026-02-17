import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";

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

      {/* Gallery Categories with Lightbox */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryLightbox categories={gallery.categories} />

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
