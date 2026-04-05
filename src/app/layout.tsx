import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Komal Krishan Shrestha — Web Developer & AI Builder",
  description:
    "Portfolio of Komal Krishan Shrestha, Junior Web Developer from Biratnagar, Nepal. Laravel, React, Next.js, and AI-powered applications.",
  keywords: [
    "web developer",
    "nepal",
    "biratnagar",
    "laravel",
    "react",
    "nextjs",
    "AI",
    "portfolio",
  ],
  openGraph: {
    title: "Komal Krishan Shrestha — Portfolio",
    description: "Web Developer & AI Builder from Biratnagar, Nepal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-body`}
      >
        {children}
      </body>
    </html>
  );
}
