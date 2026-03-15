import type { Metadata } from "next";
import "@fontsource/geist-sans/100.css";
import "@fontsource/geist-sans/200.css";
import "@fontsource/geist-sans/300.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/800.css";
import "@fontsource/geist-sans/900.css";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Ahmed Osama — Backend .NET Engineer & IoT Specialist",
  description: "Backend .NET Engineer specializing in ASP.NET Core, Clean Architecture, and IoT Systems. Based in Tanta, Egypt.",
  keywords: ["Ahmed Osama", ".NET", "Backend", "IoT", "C#", "ASP.NET", "Portfolio"],
  authors: [{ name: "Ahmed Osama" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-white/20 selection:text-white antialiased" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
