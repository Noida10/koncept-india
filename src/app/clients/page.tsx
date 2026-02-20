import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "Trusted by JW Marriott, Hyatt, BMW, Bacardi, and leading hospitality and corporate brands across India.",
};

export default function ClientsPage() {
  const content = getContent();
  const { clients, pageBackgrounds } = content;
  const bg = pageBackgrounds?.clients;

  return (
    <PageBackground image={bg?.image} opacity={bg?.opacity}>
      {/* Banner Image */}
      <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: clients.bannerImage
              ? `url('${clients.bannerImage}')`
              : undefined,
            backgroundColor: clients.bannerImage ? undefined : "#1B3A88",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{clients.title}</h1>
            <p className="text-gray-300 text-lg max-w-2xl">{clients.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Client Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {clients.categories.map((category, catIdx) => (
            <div
              key={category.name}
              className={catIdx > 0 ? "mt-16" : ""}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {category.name}
              </h2>
              <div className="w-16 h-1 bg-amber-700 mb-8"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.clients.map((client) => (
                  <div
                    key={client}
                    className="group flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-amber-200 transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-amber-50 transition-colors">
                      <span className="text-lg font-bold text-amber-700">
                        {client.charAt(0)}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium text-sm leading-tight">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Building Long-Term Partnerships
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our client relationships are built on trust, quality, and consistent
            delivery. From five-star hospitality brands to global corporate
            giants, we are proud to be the preferred printing and packaging
            partner for industry leaders.
          </p>
        </div>
      </section>
    </PageBackground>
  );
}
