"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "Shop" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              KOKIYUM
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background">
                <div className="p-4">
                <Link href="/" className="text-2xl font-bold tracking-tight mb-8 block">
                  KOKIYUM
                </Link>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map(link => (
                       <Link 
                        key={link.href} 
                        href={link.href} 
                        className="text-lg hover:text-primary transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link href="#" className="flex items-center gap-2 text-lg hover:text-primary transition-colors pt-4 border-t border-border" onClick={() => setMenuOpen(false)}>
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart</span>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
