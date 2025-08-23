"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Mountain } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
})

export default function Footer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
             <Link href="#" className="flex items-center gap-2">
                <Mountain className="h-6 w-6" />
                <span className="font-bold text-lg">Vogue Vault</span>
              </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop destination for the latest fashion trends.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-primary">New Arrivals</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Clothing</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Accessories</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Vogue Vault. All Rights Reserved.
          </p>
          <div className="flex gap-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-gray-500 hover:text-primary"><Twitter /></Link>
            <Link href="#" className="text-gray-500 hover:text-primary"><Facebook /></Link>
            <Link href="#" className="text-gray-500 hover:text-primary"><Instagram /></Link>
            <Link href="#" className="text-gray-500 hover:text-primary"><Youtube /></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
