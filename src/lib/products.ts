export type Product = {
  name: string;
  slug: string;
  price: number;
  image: string;
  hint: string;
  category: string; 
  description: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    name: "Classic White Tee",
    slug: "classic-white-tee",
    price: 999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    hint: "white t-shirt",
    category: "Tops",
    description: "<p>A timeless wardrobe staple. Made from 100% premium cotton, this classic white tee offers a soft, breathable fit. Perfect for layering or wearing on its own for a clean, minimalist look. Features a durable ribbed collar and a modern, tailored cut.</p>",
    featured: true,
  },
  {
    name: "Vintage High-Waist Jeans",
    slug: "vintage-high-waist-jeans",
    price: 3499,
    image: "https://images.unsplash.com/photo-1604176354204-926873782855?auto=format&fit=crop&w=800&q=80",
    hint: "high-waist jeans",
    category: "Bottoms",
    description: "<p>Channel retro vibes with our Vintage High-Waist Jeans. Crafted from durable, non-stretch denim, they feature a flattering high-rise waist, a classic five-pocket design, and a straight-leg cut that pairs perfectly with everything from sneakers to boots.</p>",
    featured: true,
  },
  {
    name: "Floral Sundress",
    slug: "floral-sundress",
    price: 2899,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    hint: "floral sundress",
    category: "Dresses",
    description: "<p>Embrace the sunshine with this breezy Floral Sundress. Featuring a vibrant floral print, a lightweight fabric, adjustable spaghetti straps, and a flattering A-line silhouette, it's the perfect choice for warm-weather outings, picnics, or a casual day out.</p>",
    featured: true,
  },
  {
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 4500,
    image: "https://images.unsplash.com/photo-1579631621944-a957c5a01b5e?auto=format&fit=crop&w=800&q=80",
    hint: "leather bag",
    category: "Accessories",
    description: "<p>Effortlessly chic and practical. Our Leather Crossbody Bag is made from genuine pebbled leather and features a compact design with multiple compartments to keep your essentials organized. The adjustable strap allows for comfortable, hands-free wear.</p>",
    featured: true,
  },
    {
    name: "Oversized Knit Sweater",
    slug: "oversized-knit-sweater",
    price: 3200,
    image: "https://images.unsplash.com/photo-1588143216885-3162a03525e9?auto=format&fit=crop&w=800&q=80",
    hint: "knit sweater",
    category: "Tops",
    description: "<p>Stay cozy and stylish in our Oversized Knit Sweater. With its relaxed fit, drop shoulders, and chunky knit texture, this sweater is perfect for creating a comfortable yet fashionable look. Pair it with leggings or your favorite jeans.</p>",
    featured: false,
  },
  {
    name: "Tailored Black Trousers",
    slug: "tailored-black-trousers",
    price: 2599,
    image: "https://images.unsplash.com/photo-1592878912214-3d9def1853a0?auto=format&fit=crop&w=800&q=80",
    hint: "black trousers",
    category: "Bottoms",
    description: "<p>A versatile foundation for any professional or smart-casual wardrobe. These tailored trousers are cut for a slim, modern fit and feature a classic hook-and-bar closure, belt loops, and pressed creases for a polished finish.</p>",
    featured: false,
  },
  {
    name: "Satin Midi Skirt",
    slug: "satin-midi-skirt",
    price: 2199,
    image: "https://images.unsplash.com/photo-1627914650529-51fc612b487c?auto=format&fit=crop&w=800&q=80",
    hint: "satin skirt",
    category: "Bottoms",
    description: "<p>Elegant and on-trend, this satin midi skirt drapes beautifully for a fluid, feminine silhouette. The lustrous fabric catches the light, making it perfect for dressing up with a camisole and heels or down with a simple tee and sneakers.</p>",
    featured: false,
  },
  {
    name: "Linen-Blend Shirt",
    slug: "linen-blend-shirt",
    price: 1899,
    image: "https://images.unsplash.com/photo-1622470953794-3a3b04ea4f48?auto=format&fit=crop&w=800&q=80",
    hint: "linen shirt",
    category: "Tops",
    description: "<p>Keep cool and look effortlessly chic in our Linen-Blend Shirt. The breathable fabric and relaxed fit make it an ideal choice for warmer days. Features a button-front closure, a classic collar, and can be worn tucked in or tied at the waist.</p>",
    featured: false,
  },
];
