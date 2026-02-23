import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MalkinPopup from "@/components/MalkinPopup";

export const metadata: Metadata = {
  title: {
    default: "Koncept India Enterprises | Premium Printing & Packaging",
    template: "%s | Koncept India Enterprises",
  },
  description:
    "Leading high-quality printers in Delhi offering Offset, Digital, Screen, UV Printing, Corporate Gifting, Leather Products, and Custom Packaging solutions.",
  keywords: [
    "printing services delhi",
    "corporate gifting delhi",
    "custom packaging boxes",
    "premium printing india",
    "leather products delhi",
    "offset printing",
    "luxury packaging",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MalkinPopup />
      </body>
    </html>
  );
}
