import type { Metadata } from "next";
import { Bebas_Neue, Inter, Cairo } from "next/font/google";
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

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ahmed Osama — Backend .NET Engineer & IoT Specialist",
  description: "Backend .NET Engineer specializing in ASP.NET Core, Clean Architecture, and IoT Systems. Based in Tanta, Egypt.",
  keywords: ["Ahmed Osama", ".NET", "Backend", "IoT", "C#", "ASP.NET", "Portfolio"],
  authors: [{ name: "Ahmed Osama" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${cairo.variable}`}>
      <body style={{ background: "#dbd9d2" }}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
