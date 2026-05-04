import type { Metadata } from "next";
import { Archivo_Black, Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/ui/footer";
import { SiteHeader } from "@/components/ui/site-header";
import { getSiteSettings } from "@/sanity/lib/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo-black" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "SJSU Concrete Canoes",
  description: "Official website for the SJSU Concrete Canoes Club.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable} ${playfair.variable}`}>
      <body>
        <SiteHeader links={settings.navigation} />
        <main>{children}</main>
        <Footer
          title={settings.title}
          tagline={settings.tagline}
          navigation={settings.navigation}
          footerLinks={settings.footerLinks}
        />
      </body>
    </html>
  );
}
