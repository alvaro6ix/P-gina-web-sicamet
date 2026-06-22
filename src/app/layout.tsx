import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { ThemeProvider, themeInitScript } from "@/components/theme/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CustomCursor } from "@/components/providers/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";
import { Chatbot } from "@/components/chatbot/chatbot";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Laboratorio de Metrología y Calibración ISO/IEC 17025`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "calibración",
    "metrología",
    "ISO 17025",
    "calibración acreditada",
    "calificación de equipos",
    "laboratorio de calibración",
    "Vaisala México",
    "mapeo térmico",
    "Toluca",
    "EMA",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Metrología y Calibración Acreditada`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Metrología y Calibración Acreditada`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#060912" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <Preloader />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsappFab />
            <Chatbot />
          </SmoothScroll>
        </ThemeProvider>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </body>
    </html>
  );
}
