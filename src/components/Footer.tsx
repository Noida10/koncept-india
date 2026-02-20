import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-lg font-bold text-white leading-tight">Koncept India</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Enterprises</span>
            </div>
            <p className="text-sm leading-relaxed">
              One of the leading high-quality printers equipped with in-house
              facilities featuring the latest state-of-the-art technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/printing", label: "Printing Services" },
                { href: "/packaging", label: "Packaging Solutions" },
                { href: "/gallery", label: "Catalogue" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* New Delhi Office */}
          <div>
            <h3 className="text-white font-semibold mb-4">New Delhi Office</h3>
            <p className="text-sm leading-relaxed">
              B-213, 3rd Floor, Back Side, Naraina Industrial Area, Phase - 1,
              New Delhi, Delhi 110028, India
            </p>
          </div>

          {/* Jaipur Office */}
          <div>
            <h3 className="text-white font-semibold mb-4">Jaipur Office</h3>
            <p className="text-sm leading-relaxed mb-4">
              7.2 Miles Tonk Road, Behind Wood Villa, Sanganer, Jaipur 302029
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-amber-400">Phone:</span>{" "}
                <a href="tel:+918860331991" className="hover:text-amber-300">+91 – 88603 31991</a>
              </p>
              <p>
                <span className="text-amber-400">Email:</span>{" "}
                <a href="mailto:Konceptindia.enterprises@gmail.com" className="hover:text-amber-400">
                  Konceptindia.enterprises@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Software */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Koncept India Enterprises. All rights reserved.</p>
          <p>
            Recommended Hotel PMS:{" "}
            <a
              href="https://frontdesko.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-400 transition-colors font-medium"
            >
              Frontdesko.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
