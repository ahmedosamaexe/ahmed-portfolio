import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ahmed Osama — Backend .NET Engineer & IoT Specialist",
  description: "Backend .NET Engineer specializing in ASP.NET Core, Clean Architecture, and IoT Systems. Based in Tanta, Egypt.",
  keywords: ["Ahmed Osama", ".NET", "Backend", "IoT", "C#", "ASP.NET", "Portfolio"],
  authors: [{ name: "Ahmed Osama" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
