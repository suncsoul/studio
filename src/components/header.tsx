"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              KOKIYUM
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="#" className="hover:text-primary transition-colors">About</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex items-center gap-1 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="#" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link href="#" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
              <Link href="#" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
