import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const categories = [
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1593032457869-4b42a4a9ecce?auto=format&fit=crop&w=800&q=80', hint: 'woman tops fashion' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1618354695024-0fa1c44b0d10?auto=format&fit=crop&w=800&q=80', hint: 'jeans fashion' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1618354694914-7a0db29f7c18?auto=format&fit=crop&w=800&q=80', hint: 'summer dress' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1586864389395-efb6b3f9b58e?auto=format&fit=crop&w=800&q=80', hint: 'fashion accessories' },
  ];

  const products = [
    {
      name: "Casual Tee",
      price: "₹499",
      image: "https://images.unsplash.com/photo-1618354694891-07e243f3423a?auto=format&fit=crop&w=400&q=80",
      hint: "casual t-shirt",
    },
    {
      name: "Denim Shorts",
      price: "₹699",
      image: "https://images.unsplash.com/photo-1618354695023-cc5e4c1ef48c?auto=format&fit=crop&w=400&q=80",
      hint: "denim shorts",
    },
    {
      name: "Summer Dress",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1618354695011-0de7f3cf95cb?auto=format&fit=crop&w=400&q=80",
      hint: "woman summer dress",
    },
    {
      name: "Stylish Bag",
      price: "₹399",
      image: "https://images.unsplash.com/photo-1618354695051-c2f4f7b02ee0?auto=format&fit=crop&w=400&q=80",
      hint: "handbag",
    },
  ];

  return (
    <div className="bg-white text-black">
      <section className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1602810317580-abb3f18d008e?auto=format&fit=crop&w=1350&q=80"
          alt="Hero background"
          fill
          className="absolute z-0 object-cover"
          data-ai-hint="fashion model group"
        />
        <div className="relative z-10 p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Trendy Women’s Fashion</h1>
          <p className="text-xl bg-black bg-opacity-50 px-4 py-2 rounded-md">New Arrivals Every Week | Affordable & Stylish</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link href="#" key={category.name} className="group relative h-48 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                data-ai-hint={category.hint}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
                <h3 className="text-white text-xl font-semibold p-4">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.name} className="group relative border border-gray-200 rounded-lg overflow-hidden transform transition-transform hover:shadow-xl">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  data-ai-hint={product.hint}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-md text-gray-700">{product.price}</p>
                <Link href="#" className="absolute inset-0" aria-label={`View ${product.name}`}></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Join Our Fashion Club</h2>
          <p className="text-gray-600 mt-2 mb-6">Get updates on latest trends & exclusive offers</p>
          <div className="flex justify-center">
            <Input type="email" placeholder="Enter your email" className="max-w-sm rounded-r-none" />
            <Button type="submit" className="rounded-l-none bg-primary text-primary-foreground hover:bg-primary/90">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
