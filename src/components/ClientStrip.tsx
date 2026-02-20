"use client";

export default function ClientStrip({ clients }: { clients: string[] }) {
  // Duplicate for seamless loop
  const doubled = [...clients, ...clients];

  return (
    <div className="overflow-hidden bg-gray-50 py-8">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubled.map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="inline-flex flex-col items-center justify-center mx-8 min-w-[140px]"
          >
            <div className="w-[120px] h-[60px] bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
              {/* Replace with actual client logo images in /public/images/clients/ */}
              <img
                src={`/images/clients/${client.toLowerCase().replace(/\s+/g, "-")}.png`}
                alt={client}
                className="max-w-full max-h-full object-contain p-2"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span
                className="text-gray-700 font-semibold text-xs text-center px-2 hidden items-center justify-center w-full h-full"
              >
                {client}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
