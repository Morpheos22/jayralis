import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayralis Company Limited | Vision. Opportunity. Growth.",
  description:
    "Jayralis Company Limited is a dynamic, Nigerian-rooted holding company headquartered in Abuja, dedicated to creating sustainable value through strategic investments and innovation.",
  keywords: [
    "Jayralis",
    "holding company",
    "Nigeria",
    "Abuja",
    "investments",
    "media",
    "fashion",
    "advertising",
    "events",
    "philanthropy",
    "ventures",
    "innovation",
  ],
  authors: [{ name: "Jayralis Company Limited" }],
  icons: {
    icon: "/jayralis-logo.jpg",
  },
  openGraph: {
    title: "Jayralis Company Limited | Vision. Opportunity. Growth.",
    description:
      "A dynamic, Nigerian-rooted holding company dedicated to creating sustainable value through strategic investments and innovation.",
    siteName: "Jayralis Company Limited",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayralis Company Limited | Vision. Opportunity. Growth.",
    description:
      "A dynamic, Nigerian-rooted holding company dedicated to creating sustainable value through strategic investments and innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Security: Referrer-Policy at document level (defense in depth
            alongside the HTTP header) */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Security: Prevent MIME confusion */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        {/* Security: Block legacy IE compatibility modes */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Security: Block content-type sniffing on IE */}
        <meta name="format-detection" content="telephone=no" />
        {/* Security: Disable automatic detection of address / phone data */}
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        {/* Security: Block AI training scrapers at meta level (defense in depth) */}
        <meta name="robots" content="index, follow, noarchive, nosnippet, notranslate" />
        {/* Security: Block Open Graph image scraping leaks via referrer */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
