import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { display, sans } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cyclo Club de Puymoyen — Club de cyclisme près d'Angoulême",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#151515",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* active les animations de révélation uniquement si JavaScript est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
