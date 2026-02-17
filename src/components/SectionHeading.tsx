export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="w-20 h-1 bg-amber-700 mx-auto mb-4"></div>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
