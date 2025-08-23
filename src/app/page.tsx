import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const products = [
    {
      name: "Classic Denim Jacket",
      price: "$79.99",
      image: "https://placehold.co/600x400.png",
      hint: "denim jacket",
      slug: "classic-denim-jacket",
    },
    {
      name: "Striped Summer Dress",
      price: "$49.99",
      image: "https://placehold.co/600x400.png",
      hint: "summer dress",
      slug: "striped-summer-dress",
    },
    {
      name: "Leather Ankle Boots",
      price: "$129.99",
      image: "https://placehold.co/600x400.png",
      hint: "leather boots",
      slug: "leather-ankle-boots",
    },
    {
      name: "Minimalist Silver Watch",
      price: "$199.99",
      image: "https://placehold.co/600x400.png",
      hint: "silver watch",
      slug: "minimalist-silver-watch",
    },
    {
      name: "Linen Button-Up Shirt",
      price: "$64.99",
      image: "https://placehold.co/600x400.png",
      hint: "linen shirt",
      slug: "linen-button-up-shirt",
    },
    {
      name: "High-Waisted Skinny Jeans",
      price: "$89.99",
      image: "https://placehold.co/600x400.png",
      hint: "skinny jeans",
      slug: "high-waisted-skinny-jeans",
    },
  ]

  const categories = [
    { name: 'Dresses', image: 'https://placehold.co/400x500.png', hint: 'woman dress' },
    { name: 'Tops', image: 'https://placehold.co/400x500.png', hint: 'woman shirt' },
    { name: 'Jeans', image: 'https://placehold.co/400x500.png', hint: 'blue jeans' },
    { name: 'Shoes', image: 'https://placehold.co/400x500.png', hint: 'fashion shoes' },
    { name: 'Accessories', image: 'https://placehold.co/400x500.png', hint: 'handbag' },
  ];

  return (
    <div className="bg-white">
      <main>
        <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
            data-ai-hint="fashion model runway"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <div key={product.name} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-80">
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
                        <Link href={`/products/${product.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {categories.map((category) => (
                <Link href="#" key={category.name} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={500}
                      className="group-hover:opacity-75 transition-opacity object-cover"
                      data-ai-hint={category.hint}
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
