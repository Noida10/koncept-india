import Link from "next/link";
import { getContent } from "@/lib/content";
import ClientStrip from "@/components/ClientStrip";
import HeroProductCarousel from "@/components/HeroProductCarousel";

const icons: Record<string, React.ReactNode> = {
  print: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12z" />
    </svg>
  ),
  gift: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  package: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
};

export default function HomePage() {
  const content = getContent();
  const { home } = content;

  return (
    <>
      {/* Hero Section — split layout with product carousel */}
      <section className={`relative overflow-hidden ${home.heroTextColor === "dark" ? "text-gray-900" : "text-white"}`}>
        {/* Background image layer */}
        {home.heroBackground ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${home.heroBackground})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900" />
        )}
        {/* Overlay for text readability */}
        <div className={`absolute inset-0 ${
          home.heroTextColor === "dark"
            ? "bg-gradient-to-r from-white/80 via-white/60 to-white/40"
            : "bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/60"
        }`}></div>
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${
          home.heroTextColor === "dark" ? "bg-amber-400/10" : "bg-amber-700/10"
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 ${
          home.heroTextColor === "dark" ? "bg-amber-300/10" : "bg-amber-600/10"
        }`}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${
                home.heroTextColor === "dark"
                  ? "bg-amber-700/10 border border-amber-700/20"
                  : "bg-amber-700/20 border border-amber-700/30"
              }`}>
                <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  home.heroTextColor === "dark" ? "text-amber-800" : "text-amber-300"
                }`}>
                  Since 2008
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                {home.heroTitle}
              </h1>
              <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-xl ${
                home.heroTextColor === "dark" ? "text-gray-600" : "text-gray-300"
              }`}>
                {home.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
                >
                  {home.heroCta}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className={`inline-flex items-center px-8 py-3.5 border-2 font-semibold rounded-lg transition-all ${
                    home.heroTextColor === "dark"
                      ? "border-gray-900/20 hover:border-gray-900/40 hover:bg-gray-900/5 text-gray-900"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5 text-white"
                  }`}
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Right: Product showcase carousel */}
            <div className="lg:pl-8">
              <HeroProductCarousel products={home.heroProducts} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                  {icons[link.icon] || icons.print}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client Strip */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <h2 className="text-center text-xl font-semibold text-gray-500 uppercase tracking-wide">
            Trusted By Leading Brands
          </h2>
        </div>
        <ClientStrip clients={home.clientStrip} />
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to elevate your brand?
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            Let us bring your vision to life with premium printing, packaging, and gifting solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
