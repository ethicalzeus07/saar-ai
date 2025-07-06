import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import Header from "@/components/ui/common/header";
import Footer from "@/components/ui/common/footer";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});



export const metadata: Metadata = {
  title: "Saar-ai - AI Powered Document Summarizer",
  description:
    "Save your time and get summary of your documents with our AI powered tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${fontSans.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
