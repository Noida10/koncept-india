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
            className="inline-flex items-center justify-center mx-8 px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-100 min-w-[180px]"
          >
            <span className="text-gray-700 font-semibold text-sm">{client}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
