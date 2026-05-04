import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "SAHJONY | Hollywood Cinematic AI",
  description: "The world's most advanced AI-powered video engine with Hollywood-grade visual effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} font-neural antialiased`}>
        {children}
        <div className="scanlines"></div>
      </body>
    </html>
  );
}
