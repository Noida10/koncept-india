import Link from "next/link";
import { getContent } from "@/lib/content";
import ClientStrip from "@/components/ClientStrip";
import ScrollReveal from "@/components/ScrollReveal";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import RotatingCTA from "@/components/RotatingCTA";
import IndustryTabs from "@/components/IndustryTabs";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function HomePage() {
  const content = getContent();
  const { home } = content;

  const premiumIntro = home.premiumIntro || {
    title: "Premium Printing & Packaging for Leading Brands",
    paragraphs: [
      "With over two decades of experience, Koncept India Enterprises delivers end-to-end printing, packaging, corporate gifting, and leather product solutions. Our in-house facility features state-of-the-art technology for multi-colour offset, digital, screen, UV, and leaf printing.",
      "Trusted by hospitality giants like JW Marriott, Hyatt, and Pullman, and corporate leaders like BMW and DLF — we combine craftsmanship with innovation to bring your brand vision to life.",
    ],
    linkText: "Learn More About Us",
    linkHref: "/about",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
  };

  const crossSell = home.crossSellCTA || {
    title: "Need Printing Services Along With Packaging?",
    description: "From brochures and catalogues to corporate stationery and wedding invitations — our in-house printing facility delivers exceptional quality with fast turnaround. Combine with our packaging solutions for a complete brand experience.",
    buttonText: "Explore Printing Services",
    buttonHref: "/printing",
    image: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?q=80&w=800&auto=format&fit=crop",
  };

  const stats = home.stats || [
    { value: 20, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Projects Delivered" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 4, suffix: "", label: "Service Verticals" },
  ];

  const rotatingCTA = home.rotatingCTA || {
    words: ["Quality", "Precision", "Innovation", "Excellence"],
    titlePrefix: "Elevate Your Brand with",
    subtitle: "Partner with us for premium printing, packaging, and gifting solutions that set your brand apart.",
    buttonText: "Start Your Project",
    buttonHref: "/contact",
  };

  const industries = home.industries || {
    sectionTitle: "Solutions Across Industries",
    sectionSubtitle: "Tailored printing and packaging for every sector — crafted with precision to meet unique industry demands.",
    items: [],
  };

  const portfolio = home.portfolio || {
    title: "Our Work",
    subtitle: "A showcase of premium printing, packaging, and gifting solutions crafted for leading brands.",
    images: [],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={home.heroBackground}
            alt="Koncept India Printing Facility"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
              {home.heroTitle}
            </h1>
            <p
              className="text-base sm:text-lg mb-8 leading-relaxed max-w-xl text-gray-300 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              {home.heroSubtitle}
            </p>
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
              >
                Start Your Project
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-3.5 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold rounded-lg transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise — 4 image cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {home.expertiseTitle || "Our Expertise"}
            </h2>
            <div className="w-20 h-1 bg-amber-700 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {home.expertiseSubtitle || "Comprehensive printing, packaging, gifting, and leather solutions tailored to elevate your brand."}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.quickLinks.map((link, i) => (
              <ScrollReveal key={link.title} delay={i * 100}>
                <Link
                  href={link.href}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={link.image || home.heroProducts[i]?.image || ""}
                      alt={link.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Solutions Intro */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {premiumIntro.title}
              </h2>
              {premiumIntro.paragraphs.map((p, i) => (
                <p key={i} className={`text-gray-600 leading-relaxed ${i === 0 ? "mb-6 text-lg" : "mb-8"}`}>
                  {p}
                </p>
              ))}
              <Link
                href={premiumIntro.linkHref}
                className="inline-flex items-center text-amber-700 hover:text-amber-800 font-semibold transition-colors"
              >
                {premiumIntro.linkText}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={premiumIntro.image}
                  alt="Koncept India printing and packaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsSection stats={stats} />

      {/* Rotating CTA */}
      <RotatingCTA
        words={rotatingCTA.words}
        titlePrefix={rotatingCTA.titlePrefix}
        subtitle={rotatingCTA.subtitle}
        buttonText={rotatingCTA.buttonText}
        buttonHref={rotatingCTA.buttonHref}
      />

      {/* Industry Tabs */}
      <IndustryTabs
        sectionTitle={industries.sectionTitle}
        sectionSubtitle={industries.sectionSubtitle}
        items={industries.items}
      />

      {/* Portfolio Grid */}
      <PortfolioGrid
        title={portfolio.title}
        subtitle={portfolio.subtitle}
        images={portfolio.images}
      />

      {/* Client Strip */}
      <section className="py-12 bg-gray-50">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h2 className="text-center text-xl font-semibold text-gray-500 uppercase tracking-wide">
              {home.clientStripTitle || "Trusted By Leading Brands"}
            </h2>
          </div>
        </ScrollReveal>
        <ClientStrip clients={home.clientStrip} />
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={home.testimonials || []} />

      {/* Cross-Sell CTA */}
      <section className="relative py-20 text-white overflow-hidden bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={crossSell.image}
                  alt="Printing services"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {crossSell.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {crossSell.description}
              </p>
              <Link
                href={crossSell.buttonHref}
                className="inline-flex items-center px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
              >
                {crossSell.buttonText}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
