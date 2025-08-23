"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Mountain, Search, ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Mountain className="h-6 w-6" />
              <span className="font-bold text-lg">Vogue Vault</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="#" className="hover:text-primary">New Arrivals</Link>
              <Link href="#" className="hover:text-primary">Clothing</Link>
              <Link href="#" className="hover:text-primary">Accessories</Link>
              <Link href="#" className="hover:text-primary">Sale</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
                <Link href="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
            </div>
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <div className="grid gap-4 py-6">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <Mountain className="h-6 w-6" />
                        <span className="font-bold text-lg">Vogue Vault</span>
                    </Link>
                    <Link href="#" className="font-medium hover:text-primary">New Arrivals</Link>
                    <Link href="#" className="font-medium hover:text-primary">Clothing</Link>
                    <Link href="#" className="font-medium hover:text-primary">Accessories</Link>
                    <Link href="#" className="font-medium hover:text-primary">Sale</Link>
                    <hr className="my-4"/>
                    <Link href="#" className="font-medium hover:text-primary">Account</Link>
                    <Link href="/cart" className="font-medium hover:text-primary">Cart</Link>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
