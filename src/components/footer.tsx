"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg md:text-2xl mb-2">KOKIYUM</h3>
            <p className="text-muted-foreground text-xs md:text-sm max-w-md">
              Discover curated collections that blend modern trends with timeless elegance. Quality fashion delivered to your door.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-semibold text-base md:text-lg mb-4">Address</h4>
            <address className="text-muted-foreground text-xs md:text-sm not-italic">
              KOKIYUM, Near TVS Showroom,<br />
              Rajgarh Naka, Ramakrishna Nagar,<br />
              Jhabua, Madhya Pradesh 457661
            </address>
          </div>
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KOKIYUM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
