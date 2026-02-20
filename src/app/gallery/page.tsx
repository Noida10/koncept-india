import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Gallery & Portfolio",
  description:
    "View our portfolio of luxury packaging, eco-friendly hotel amenities, custom bags, and premium leather products.",
};

export default function GalleryPage() {
  const content = getContent();
  const { gallery, pageBackgrounds } = content;
  const bg = pageBackgrounds?.gallery;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: gallery.bannerImage
              ? `url('${gallery.bannerImage}')`
              : undefined,
            backgroundColor: gallery.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{gallery.title}</h1>
            <p className="text-gray-300 text-lg max-w-2xl">{gallery.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Gallery Categories with Lightbox */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryLightbox categories={gallery.categories} />
        </div>
      </section>
    </PageBackground>
  );
}
