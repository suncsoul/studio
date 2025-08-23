import { Button } from "@/components/ui/button"
import { Shirt, ShoppingCart, User, Search, Mountain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const products = [
    {
      name: "Classic Denim Jacket",
      price: "$79.99",
      image: "https://placehold.co/600x400.png",
      hint: "denim jacket"
    },
    {
      name: "Striped Summer Dress",
      price: "$49.99",
      image: "https://placehold.co/600x400.png",
      hint: "summer dress"
    },
    {
      name: "Leather Ankle Boots",
      price: "$129.99",
      image: "https://placehold.co/600x400.png",
      hint: "leather boots"
    },
    {
      name: "Minimalist Silver Watch",
      price: "$199.99",
      image: "https://placehold.co/600x400.png",
      hint: "silver watch"
    },
    {
      name: "Linen Button-Up Shirt",
      price: "$64.99",
      image: "https://placehold.co/600x400.png",
      hint: "linen shirt"
    },
    {
      name: "High-Waisted Skinny Jeans",
      price: "$89.99",
      image: "https://placehold.co/600x400.png",
      hint: "skinny jeans"
    },
  ]

  return (
    <div className="bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="#" className="flex items-center gap-2">
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
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
            data-ai-hint="fashion model"
          />
          <div className="relative z-10 bg-black bg-opacity-40 p-8 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">New Collection is Here</h1>
            <p className="mt-4 max-w-xl mx-auto text-lg">Discover the latest trends and refresh your wardrobe with our stunning new arrivals.</p>
            <Button size="lg" className="mt-8">Shop Now</Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.name} className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover object-center"
                      data-ai-hint={product.hint}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
