import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveHeader from "../src/components/ResponsiveHeader";
import ResponsiveSidebar from "../src/components/ResponsiveSidebar";
import Footer from "../src/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FactureChain",
  description: "Transparence de la facturation électrique avec blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-white">
        <ResponsiveHeader />
        <ResponsiveSidebar />
        <main className="pt-16 sm:pt-16 md:pt-16 xl:ml-72">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
