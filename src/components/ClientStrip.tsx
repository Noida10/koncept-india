"use client";

type Client = { name: string; logo: string };

export default function ClientStrip({ clients }: { clients: Client[] }) {
  // Duplicate for seamless loop
  const doubled = [...clients, ...clients];

  return (
    <div className="overflow-hidden bg-gray-50 py-8">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubled.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="inline-flex flex-col items-center justify-center mx-10 min-w-[160px]"
          >
            <div className="w-[160px] h-[80px] flex items-center justify-center">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <span
                className={`text-gray-500 font-semibold text-sm text-center items-center justify-center w-full h-full ${
                  client.logo ? "hidden" : "flex"
                }`}
              >
                {client.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
