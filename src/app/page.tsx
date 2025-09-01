"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Product = {
  name: string;
  price: string;
  image: string;
  href: string;
  hint: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Accessories';
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Featured');

  const categories = [
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'woman tops fashion' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1529391409740-59f2658d8d74?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'jeans fashion' },
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595552636257-f9352e4a8a8a?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'summer dress' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80', href: '#', hint: 'fashion accessories watch' },
  ];

  const products: Product[] = [
    // Dresses
    {
      name: "Floral Maxi Dress",
      price: "₹3,299",
      image: "https://images.unsplash.com/photo-1594744806549-844414798e85?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "floral maxi dress",
      category: 'Dresses'
    },
    {
      name: "Satin Slip Dress",
      price: "₹2,899",
      image: "https://images.unsplash.com/photo-1627914650529-51fc612b487c?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "satin slip dress",
      category: 'Dresses'
    },
    {
      name: "Ruffled Mini Dress",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1574488334461-15fad64ab3b4?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "ruffled mini dress",
      category: 'Dresses'
    },
    {
      name: "Linen Shirt Dress",
      price: "₹3,199",
      image: "https://images.unsplash.com/photo-1621575884398-654a939a3f29?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "linen shirt dress",
      category: 'Dresses'
    },
    {
      name: "Knit Bodycon Dress",
      price: "₹2,799",
      image: "https://images.unsplash.com/photo-1614488323863-1268594241fc?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "knit bodycon dress",
      category: 'Dresses'
    },
    {
      name: "Polka Dot Midi Dress",
      price: "₹3,099",
      image: "https://images.unsplash.com/photo-1590451999233-a36f3e786312?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "polka dot dress",
      category: 'Dresses'
    },
    {
      name: "Off-Shoulder Dress",
      price: "₹2,599",
      image: "https://images.unsplash.com/photo-1551843194-85513233c1a8?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "woman off shoulder",
      category: 'Dresses'
    },
    {
      name: "A-Line Skater Dress",
      price: "₹2,399",
      image: "https://images.unsplash.com/photo-1595133283412-343513b4d241?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "skater dress",
      category: 'Dresses'
    },
    {
      name: "Bohemian Wrap Dress",
      price: "₹3,499",
      image: "https://images.unsplash.com/photo-1590452366881-a75678b6f3b0?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "bohemian dress",
      category: 'Dresses'
    },
    {
      name: "Classic Little Black Dress",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1583117181238-b9969f9843a9?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "black dress",
      category: 'Dresses'
    },
    { name: 'Sequin Party Dress', price: '₹4,999', image: 'https://images.unsplash.com/photo-1574556163315-7a6372c36a32?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'sequin party dress', category: 'Dresses'},
    { name: 'Velvet Evening Gown', price: '₹5,499', image: 'https://images.unsplash.com/photo-1599818858882-72166a0d241d?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'velvet evening gown', category: 'Dresses'},
    { name: 'Puff Sleeve Dress', price: '₹3,399', image: 'https://images.unsplash.com/photo-1609382354932-510c49b6b757?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'puff sleeve dress', category: 'Dresses'},


    // Bottoms
    {
      name: "High-Waisted Jeans",
      price: "₹2,599",
      image: "https://images.unsplash.com/photo-1604176354204-926873782855?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "high waisted jeans",
      category: 'Bottoms'
    },
    {
      name: "Pleated Trousers",
      price: "₹2,299",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "pleated trousers",
      category: 'Bottoms'
    },
    {
      name: "Wide-Leg Linen Pants",
      price: "₹2,899",
      image: "https://images.unsplash.com/photo-1603217183024-d2c613039c94?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "linen pants",
      category: 'Bottoms'
    },
    {
      name: "Denim Skirt",
      price: "₹1,899",
      image: "https://images.unsplash.com/photo-1584273147793-9a3e63b4f620?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "denim skirt",
      category: 'Bottoms'
    },
    {
      name: "Cargo Pants",
      price: "₹2,799",
      image: "https://images.unsplash.com/photo-1608405051996-480da50f3c4c?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "cargo pants",
      category: 'Bottoms'
    },
    {
      name: "Satin Midi Skirt",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1589531737424-a212215c5831?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "satin midi skirt",
      category: 'Bottoms'
    },
    {
      name: "Tailored Shorts",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1591130902253-91c2c06135b5?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "tailored shorts",
      category: 'Bottoms'
    },
    {
      name: "Leather Leggings",
      price: "₹3,199",
      image: "https://images.unsplash.com/photo-1512316041697-d3f08f840c5f?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "leather leggings",
      category: 'Bottoms'
    },
    {
      name: "Jogger Sweatpants",
      price: "₹2,199",
      image: "https://images.unsplash.com/photo-1563241527-547565ca4086?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "jogger sweatpants",
      category: 'Bottoms'
    },
    {
      name: "Plaid Mini Skirt",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1580214690239-0097a5518428?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "plaid mini skirt",
      category: 'Bottoms'
    },
    { name: 'Corduroy Pants', price: '₹2,699', image: 'https://images.unsplash.com/photo-1611808682855-081b37380996?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'corduroy pants', category: 'Bottoms'},
    { name: 'Bike Shorts', price: '₹1,599', image: 'https://images.unsplash.com/photo-1591904128994-6f3938488a7b?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'bike shorts', category: 'Bottoms'},
    
    // Accessories
    {
      name: "Leather Tote Bag",
      price: "₹4,599",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "leather tote bag",
      category: 'Accessories'
    },
    {
      name: "Gold Hoop Earrings",
      price: "₹1,299",
      image: "https://images.unsplash.com/photo-1615951663185-3932a3c75a93?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "gold hoop earrings",
      category: 'Accessories'
    },
    {
      name: "Classic Wristwatch",
      price: "₹5,899",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "classic wristwatch",
      category: 'Accessories'
    },
    {
      name: "Silk Scarf",
      price: "₹1,499",
      image: "https://images.unsplash.com/photo-1562149481-02e49c716c6d?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "silk scarf",
      category: 'Accessories'
    },
    {
      name: "Cat-Eye Sunglasses",
      price: "₹2,199",
      image: "https://images.unsplash.com/photo-1577803645773-f4208249dd7c?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "cat eye sunglasses",
      category: 'Accessories'
    },
    {
      name: "Layered Necklace",
      price: "₹1,799",
      image: "https://images.unsplash.com/photo-1611652022417-a55109d9342c?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "layered necklace",
      category: 'Accessories'
    },
    {
      name: "Leather Belt",
      price: "₹1,599",
      image: "https://images.unsplash.com/photo-1557252273-01c36642142a?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "leather belt",
      category: 'Accessories'
    },
    {
      name: "Straw Hat",
      price: "₹1,899",
      image: "https://images.unsplash.com/photo-1533282173-265141a43a0d?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "straw hat",
      category: 'Accessories'
    },
    {
      name: "Crossbody Bag",
      price: "₹3,499",
      image: "https://images.unsplash.com/photo-1579631621533-35f953ef2113?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "crossbody bag",
      category: 'Accessories'
    },
    {
      name: "Statement Ring Set",
      price: "₹1,199",
      image: "https://images.unsplash.com/photo-1603372234476-353a3a4049a4?auto=format&fit=crop&w=400&q=80",
      href: '#',
      hint: "statement ring set",
      category: 'Accessories'
    },
    { name: 'Beanie Hat', price: '₹1,299', image: 'https://images.unsplash.com/photo-1575428652377-a3d80e281475?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'beanie hat', category: 'Accessories'},
    { name: 'Canvas Backpack', price: '₹3,899', image: 'https://images.unsplash.com/photo-1553062407-98eeb6e0e5c8?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'canvas backpack', category: 'Accessories'},

     // Tops
    { name: 'Classic White Tee', price: '₹1,299', image: 'https://images.unsplash.com/photo-1581655353422-34693a595a6a?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'white t-shirt', category: 'Tops' },
    { name: 'Silk Cami Top', price: '₹1,899', image: 'https://images.unsplash.com/photo-1542295393-16a1c185121c?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'silk cami top', category: 'Tops' },
    { name: 'Oversized Hoodie', price: '₹2,999', image: 'https://images.unsplash.com/photo-1556821854-5775c7484a44?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'oversized hoodie', category: 'Tops' },
    { name: 'Striped Long Sleeve', price: '₹1,999', image: 'https://images.unsplash.com/photo-1550928434-a2125816913c?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'striped long sleeve', category: 'Tops' },
    { name: 'Cropped Sweater', price: '₹2,499', image: 'https://images.unsplash.com/photo-1588143216885-3162a03525e9?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'cropped sweater', category: 'Tops' },
    { name: 'Lace Blouse', price: '₹2,199', image: 'https://images.unsplash.com/photo-1622359516643-983f4b5f8841?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'lace blouse', category: 'Tops' },
    { name: 'Graphic T-Shirt', price: '₹1,499', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'graphic t-shirt', category: 'Tops' },
    { name: 'Denim Jacket', price: '₹3,599', image: 'https://images.unsplash.com/photo-1543087902-386568695020?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'denim jacket', category: 'Tops' },
    { name: 'Button-Down Shirt', price: '₹2,299', image: 'https://images.unsplash.com/photo-1589938833917-7429135071d3?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'button-down shirt', category: 'Tops' },
    { name: 'Turtleneck Top', price: '₹1,799', image: 'https://images.unsplash.com/photo-1581044777550-4cfa6ce998c3?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'turtleneck top', category: 'Tops' },
    { name: 'Ribbed Tank Top', price: '₹999', image: 'https://images.unsplash.com/photo-1530286623682-9435a3962d3a?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'ribbed tank top', category: 'Tops'},
    { name: 'Peplum Blouse', price: '₹2,399', image: 'https://images.unsplash.com/photo-1594938294985-a7455a0697a2?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'peplum blouse', category: 'Tops'},
    { name: 'Flannel Shirt', price: '₹2,899', image: 'https://images.unsplash.com/photo-1509402361652-afd137976b71?auto=format&fit=crop&w=400&q=80', href: '#', hint: 'flannel shirt', category: 'Tops'},

  ];

  const featuredProducts = [
    products[0], // Floral Maxi Dress
    products[13], // High-Waisted Jeans
    products[26], // Classic Wristwatch
    products[3], // Linen Shirt Dress
    products[49], // Flannel Shirt
    products[25], // Leather Tote Bag
    products[6], // Off-Shoulder Dress
    products[16], // Denim Skirt
  ]

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
            <Link href="#">Shop New Arrivals</Link>
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
      
      <section className="bg-muted/50 py-24">
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
                <Link href={product.href} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
                <div className="aspect-square w-full overflow-hidden">
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
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground truncate">{product.name}</h3>
                    <p className="text-md text-muted-foreground">{product.price}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" size="sm">Add to Cart</Button>
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
