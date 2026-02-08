import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XeiosTech Solutions | Intelligent AI Development",
  description: "We engineer AI-driven websites, apps, and data ecosystems that transform businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased font-sans"
      >
        {children}
      </body>
    </html>
  );
}
