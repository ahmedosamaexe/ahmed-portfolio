import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ahmed Osama — Backend .NET Engineer & IoT Specialist",
  description:
    "Portfolio of Ahmed Osama, a 3rd-year Computer Science student specializing in Backend .NET Engineering and IoT Systems. Based in Tanta, Egypt.",
  keywords: ["Ahmed Osama", ".NET Engineer", "IoT", "Backend Developer", "C#", "ASP.NET", "Portfolio"],
  authors: [{ name: "Ahmed Osama" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#020408] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
