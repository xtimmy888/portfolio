import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "Tahmid Zalal (Tim) — CS + Physics | Quant, ML & Scientific Computing";
const description =
  "Portfolio of Tahmid Zalal (Tim), a Computer Science & Physics graduate building quantitative systems, machine-learning models, and scientific-computing workflows.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Tahmid Zalal",
  },
  description,
  keywords: [
    "Tahmid Zalal",
    "Tim Zalal",
    "portfolio",
    "quantitative developer",
    "machine learning",
    "scientific computing",
    "data science",
    "Python",
    "Next.js",
    "Memorial University of Newfoundland",
    "St. John's",
    "HPC",
  ],
  authors: [{ name: "Tahmid Zalal", url: siteUrl }],
  creator: "Tahmid Zalal",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Tahmid Zalal",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tahmid Zalal",
  alternateName: "Tim",
  url: siteUrl,
  jobTitle: "Quantitative Developer / Software Developer",
  email: profile.socials.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "St. John's",
    addressRegion: "NL",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Memorial University of Newfoundland",
  },
  sameAs: [profile.socials.github, profile.socials.linkedin],
  knowsAbout: [
    "Machine Learning",
    "Quantitative Finance",
    "Scientific Computing",
    "Data Engineering",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only z-[100] rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main" className="relative">
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
