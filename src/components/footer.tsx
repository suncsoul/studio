"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-xl mb-2">KOKIYUM</h3>
            <p className="text-gray-400 text-sm">
              Trendy & Affordable Women’s Fashion
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Shop</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">Instagram</Link>
              <Link href="#" className="text-gray-400 hover:text-white">TikTok</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Facebook</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} KOKIYUM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
