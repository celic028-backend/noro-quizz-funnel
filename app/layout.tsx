import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noro - Otkrij svoje rešenje za disanje i san",
  description:
    "Odgovori na par pitanja (30 sekundi) i dobij personalizovanu Noro preporuku na osnovu tvog problema.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
