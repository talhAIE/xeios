import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "XeiosTech Solutions | Intelligent AI Development",
  description:
    "We engineer AI-driven websites, apps, and data ecosystems that transform businesses. Custom AI models, full-stack development, AR/VR, and cloud architecture.",
  keywords: [
    "AI development",
    "web development",
    "mobile apps",
    "machine learning",
    "XeiosTech",
    "AR/VR",
    "automation",
  ],
  openGraph: {
    title: "XeiosTech Solutions | Intelligent AI Development",
    description:
      "We engineer AI-driven websites, apps, and data ecosystems that transform businesses.",
    type: "website",
    locale: "en_US",
    siteName: "XeiosTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "XeiosTech Solutions | Intelligent AI Development",
    description:
      "We engineer AI-driven websites, apps, and data ecosystems that transform businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased font-sans">
        {/* Skip-to-content link for keyboard accessibility */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-xeios focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
