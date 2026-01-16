import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  // Resolve o aviso de metadataBase
  metadataBase: new URL(baseUrl),

  title: {
    default: "MythMirror | A New Era",
    template: "%s | MythMirror",
  },
  description:
    "Unificando educação, finanças e gamificação em um ecossistema integrado.",

  // Configuração para compartilhamento
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    title: "MythMirror",
    description: "O futuro da sua identidade digital.",
    siteName: "MythMirror",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MythMirror Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MythMirror",
    description: "O futuro da sua identidade digital.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <SmoothScrollProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
