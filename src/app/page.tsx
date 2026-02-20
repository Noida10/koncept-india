import Link from "next/link";
import { getContent } from "@/lib/content";
import ClientStrip from "@/components/ClientStrip";
import HeroProductCarousel from "@/components/HeroProductCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import Testimonials from "@/components/Testimonials";


export default function HomePage() {
  const content = getContent();
  const { home } = content;

  return (
    <>
      {/* Hero Section — full viewport slideshow */}
      <section className="relative overflow-hidden text-white h-[70vh] flex items-center">
        <HeroProductCarousel products={home.heroProducts} />
      </section>

      {/* Our Expertise */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.quickLinks.map((link, i) => (
              <ScrollReveal key={link.title} delay={i * 100}>
                <Link
                  href={link.href}
                  className="group block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-amber-200 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {link.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Strip */}
      <section>
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <h2 className="text-center text-xl font-semibold text-gray-500 uppercase tracking-wide">
              Trusted By Leading Brands
            </h2>
          </div>
        </ScrollReveal>
        <ClientStrip clients={home.clientStrip} />
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={home.testimonials || []} />

      {/* CTA — image background */}
      <section className="relative py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: content.images?.ctaBackground
              ? `url('${content.images.ctaBackground}')`
              : "url('https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to elevate your brand?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Let us bring your vision to life with premium printing, packaging, and gifting solutions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors"
            >
              Contact Us Today
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
