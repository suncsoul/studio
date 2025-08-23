import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vogue Vault - Your Fashion Destination",
  description: "Shop the latest trends in clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
