"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState, useContext } from "react"
import { products, Product } from "@/lib/products";
import { CartContext } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const { addToCart } = useContext(CartContext);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const categories = [
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'woman tops fashion' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1529391409740-59f2658d8d74?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'jeans fashion' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595552636257-f9352e4a8a8a?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'summer dress' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'fashion accessories watch' },
  ];

  const featuredProducts = products.filter(p => p.featured);

  const displayedProducts = selectedCategory === 'Featured'
    ? featuredProducts
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-background text-foreground">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80"
          alt="Hero background"
          fill
          className="absolute z-0 object-cover"
          data-ai-hint="fashion model style"
        />
        <div className="relative z-10 p-8 rounded-lg bg-black/50">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Style Redefined</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">Discover curated collections that blend modern trends with timeless elegance.</p>
          <Button size="lg" asChild>
            <Link href="#products">Shop New Arrivals</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
          {categories.map((category) => (
            <button key={category.name} onClick={() => setSelectedCategory(category.name)} className="group flex flex-col items-center gap-4 text-center">
              <div className="relative w-full aspect-square max-w-[200px] rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={category.hint}
                />
              </div>
              <h3 className="text-2xl font-semibold">{category.name}</h3>
            </button>
          ))}
        </div>
      </section>
      
      <section id="products" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-center w-full">{selectedCategory} Products</h2>
            {selectedCategory !== 'Featured' && (
              <Button variant="outline" onClick={() => setSelectedCategory('Featured')}>
                Show Featured
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {displayedProducts.map((product) => (
              <div key={product.name} className="group relative border border-border/20 rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card flex flex-col">
                <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={product.hint}
                  />
                </div>
                <div className="p-4 text-center flex-grow flex flex-col justify-between">
                   <div className="flex-grow flex flex-col justify-center">
                       <h3 className="text-lg font-semibold text-card-foreground truncate">{product.name}</h3>
                       <p className="text-md text-muted-foreground">₹{product.price.toFixed(2)}</p>
                   </div>
                   <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <Button variant="secondary" size="sm" className="relative z-20" onClick={(e) => {
                         e.stopPropagation();
                         e.preventDefault();
                         handleAddToCart(product);
                       }}>Add to Cart</Button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold">Join Our Fashion Club</h2>
          <p className="text-muted-foreground mt-4 mb-8 max-w-xl mx-auto text-lg">Get exclusive updates on the latest trends, new arrivals, and special offers delivered right to your inbox.</p>
          <form className="flex justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email address" className="max-w-sm rounded-r-none border-r-0" />
            <Button type="submit" className="rounded-l-none">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
