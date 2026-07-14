import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buy The Way Journeys — Customized Travel Plans Designed Just For You",
  description:
    "Buy The Way Journeys crafts exceptional travel experiences — dream vacations, spiritual Umrah journeys, hotel & resort bookings, and seamless event management. Experienced travel experts making travel stress-free and exciting.",
  keywords: [
    "Buy The Way Journeys",
    "tour packages",
    "Umrah packages",
    "hotel booking",
    "event management",
    "customized travel",
    "travel agency",
  ],
  authors: [{ name: "Buy The Way Journeys" }],
  icons: {
    icon: "/buythewaylogo.webp",
  },
  openGraph: {
    title: "Buy The Way Journeys — Customized Travel Plans",
    description:
      "Customized travel plans designed just for you. Tour packages, hotel & resort bookings, Umrah, and event management.",
    siteName: "Buy The Way Journeys",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
