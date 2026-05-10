import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { LoadingProvider } from "@/context/LoadingContext";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { MotionWrapper } from "@/components/layout/MotionWrapper";
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "MythMirror | A New Era", template: "%s | MythMirror" },
  description:
    "Unificando educação, finanças e gamificação em um ecossistema integrado.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    title: "MythMirror | A New Era",
    description: "O futuro da sua identidade digital.",
    siteName: "MythMirror",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ff" },
    { media: "(prefers-color-scheme: dark)", color: "#02000f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <LoadingProvider>
              <SmoothScrollProvider>
                <MotionWrapper>
                  <PageWrapper>{children}</PageWrapper>
                </MotionWrapper>
              </SmoothScrollProvider>
            </LoadingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
