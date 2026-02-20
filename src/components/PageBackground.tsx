import type { ReactNode } from "react";

export default function PageBackground({
  children,
  image,
  opacity = 0.05,
}: {
  children: ReactNode;
  image?: string;
  opacity?: number;
}) {
  if (!image) {
    return <div className="bg-white">{children}</div>;
  }

  return (
    <div className="relative bg-white">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: `url('${image}')`,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
