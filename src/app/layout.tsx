
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: "KOKIYUM - Trendy & Affordable Women's Fashion",
  description: "Shop the latest trends in women's clothing and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full bg-background font-sans antialiased", poppins.variable, inter.variable)}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-grow flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
