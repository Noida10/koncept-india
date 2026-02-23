import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ScrollReveal from "@/components/ScrollReveal";
import ImageWithFallback from "@/components/ImageWithFallback";
import PageBackground from "@/components/PageBackground";
import AboutStats from "./AboutStats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Koncept India Enterprises — dedicated to quality printing, timely delivery, and innovative packaging solutions since inception.",
};

export default function AboutPage() {
  const content = getContent();
  const { about, images, pageBackgrounds } = content;
  const bg = pageBackgrounds?.about;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: about.bannerImage
              ? `url('${about.bannerImage}')`
              : undefined,
            backgroundColor: about.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{about.title}</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Dedicated to excellence in printing, packaging, and corporate solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story — left text, right image */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              {about.overview.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4 text-lg">
                  {p}
                </p>
              ))}
              <AboutStats />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <ImageWithFallback
                src={images?.aboutStory || "/images/about/our-story.jpg"}
                alt="Our Story"
                className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100"
                fallbackText="Image placeholder"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Machinery — left image, right text */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <ImageWithFallback
                src={images?.aboutMachinery || "/images/about/machinery.jpg"}
                alt="Our Machinery"
                className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100"
                fallbackText="Image placeholder"
              />
            </ScrollReveal>
            <ScrollReveal delay={200} className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Machinery</h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              {about.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-amber-700 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">{cap}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Meet the Founder — left text, right photo */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              <div className="space-y-4">
                {about.visionMission.map((item, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-lg">{item}</p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <ImageWithFallback
                src={images?.aboutFounder || "/images/about/founder.jpg"}
                alt="Founder"
                className="rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto bg-gray-100"
                fallbackIcon="person"
                fallbackText="Founder photo"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageBackground>
  );
}
