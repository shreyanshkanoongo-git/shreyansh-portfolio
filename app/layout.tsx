import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shreyansh Kanoongo — AI Systems Builder",
  description: "I build AI-powered systems, automation workflows, and full-stack applications. Based in Jaipur, India. Available for full-time roles, freelance, and contracts.",
  openGraph: {
    title: "Shreyansh Kanoongo — AI Systems Builder",
    description: "I build AI-powered systems, automation workflows, and full-stack applications.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
