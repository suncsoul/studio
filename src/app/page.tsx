import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const categories = [
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'woman tops fashion' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1529391409740-59f2658d8d74?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'jeans fashion' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595552636257-f9352e4a8a8a?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'summer dress' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'fashion accessories watch' },
  ];

  const products = [
    {
      name: "Monochrome Urban Tee",
      price: "₹1,299",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "woman t-shirt",
    },
    {
      name: "Classic Denim Jacket",
      price: "₹3,499",
      image: "https://images.unsplash.com/photo-1596755094514-73a04de895b3?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "denim jacket",
    },
    {
      name: "Elegant Summer Dress",
      price: "₹2,899",
      image: "https://images.unsplash.com/photo-1590451999233-a36f3e786312?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "woman summer dress",
    },
    {
      name: "Minimalist Leather Bag",
      price: "₹4,199",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d1282e?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "leather handbag",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="relative h-[70vh] min-h-[400px] bg-cover bg-center flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1350&q=80"
          alt="Hero background"
          fill
          className="absolute z-0 object-cover"
          data-ai-hint="fashion model style"
        />
        <div className="relative z-10 p-8 rounded-lg bg-black/50">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Style Redefined</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">Discover curated collections that blend modern trends with timeless elegance.</p>
          <Button size="lg" asChild>
            <Link href="#">Shop New Arrivals</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group flex flex-col items-center gap-4 text-center">
              <div className="relative w-full aspect-square max-w-[180px] rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={category.hint}
                />
              </div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <div key={product.name} className="group relative border border-border/50 rounded-lg overflow-hidden transform transition-transform hover:shadow-2xl hover:-translate-y-2 bg-card">
                <Link href={product.href} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={product.hint}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-card-foreground">{product.name}</h3>
                  <p className="text-md text-muted-foreground">{product.price}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/70 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Join Our Fashion Club</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-lg mx-auto">Get exclusive updates on the latest trends, new arrivals, and special offers delivered right to your inbox.</p>
          <form className="flex justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email address" className="max-w-sm rounded-r-none border-r-0" />
            <Button type="submit" className="rounded-l-none">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
