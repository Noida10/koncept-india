import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageBackground from "@/components/PageBackground";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Koncept India Enterprises for premium printing, corporate gifting, and packaging solutions. Offices in New Delhi and Jaipur.",
};

export default function ContactPage() {
  const content = getContent();
  const { siteInfo, pageBackgrounds } = content;
  const contactData = content.contact;
  const bg = pageBackgrounds?.contact;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: contactData?.bannerImage
              ? `url('${contactData.bannerImage}')`
              : undefined,
            backgroundColor: contactData?.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              We&apos;d love to hear from you. Reach out for inquiries, quotes, or to discuss your project.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a message
              </h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>
              <ContactForm />
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <div className="w-16 h-1 bg-amber-700 mb-6"></div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a href="tel:+918860331991" className="text-gray-600 hover:text-amber-700">
                      {siteInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a href={`mailto:${siteInfo.email}`} className="text-gray-600 hover:text-amber-700">
                      {siteInfo.email}
                    </a>
                  </div>
                </div>

                {/* Registered Office */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Registered Office (New Delhi)</h3>
                    <p className="text-gray-600">{siteInfo.registeredOffice.address}</p>
                  </div>
                </div>

                {/* Branch Office */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Branch Office (Jaipur)</h3>
                    <p className="text-gray-600">{siteInfo.branchOffice.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">New Delhi Office</h3>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-200 h-64 flex items-center justify-center">
                <iframe
                  src={siteInfo.registeredOffice.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="New Delhi Office Location"
                ></iframe>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Jaipur Office</h3>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-200 h-64 flex items-center justify-center">
                <iframe
                  src={siteInfo.branchOffice.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jaipur Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageBackground>
  );
}
