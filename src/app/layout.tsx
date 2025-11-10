import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/layout/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareAlign CDI | Clinical Documentation Intelligence",
  description:
    "AI-assisted documentation guidance for HCC capture and RAF scoring in value-based care clinics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 antialiased`}
      >
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-slate-50">
              <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
