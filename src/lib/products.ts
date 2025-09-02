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

// The static products array is restored for local development.
export const products: Product[] = [
    {
        "name": "Classic White Tee",
        "slug": "classic-white-tee",
        "price": 999,
        "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "hint": "white t-shirt",
        "category": "Tops",
        "description": "A timeless classic. This soft, 100% cotton white tee is a must-have for every wardrobe. Perfect for layering or wearing on its own.",
        "featured": true
    },
    {
        "name": "Vintage High-Waist Jeans",
        "slug": "vintage-high-waist-jeans",
        "price": 3499,
        "image": "https://images.unsplash.com/photo-1602293589923-7a9f4baac548?auto=format&fit=crop&w=800&q=80",
        "hint": "high-waist jeans",
        "category": "Bottoms",
        "description": "Inspired by the 90s, these high-waist jeans offer a flattering fit and a stylish vintage look. Made with durable denim for all-day comfort.",
        "featured": true
    },
    {
        "name": "Floral Sundress",
        "slug": "floral-sundress",
        "price": 2899,
        "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
        "hint": "floral dress",
        "category": "Dresses",
        "description": "Embrace the sunshine with this light and airy floral sundress. Featuring a delicate floral print and a comfortable, flowing silhouette.",
        "featured": true
    },
    {
        "name": "Leather Crossbody Bag",
        "slug": "leather-crossbody-bag",
        "price": 2299,
        "image": "https://images.unsplash.com/photo-1579631542720-3a87824189a6?auto=format&fit=crop&w=800&q=80",
        "hint": "leather bag",
        "category": "Accessories",
        "description": "A chic and practical leather crossbody bag. Compact yet spacious enough for your essentials, it's the perfect accessory for any outfit.",
        "featured": false
    },
    {
        "name": "Striped Linen Shirt",
        "slug": "striped-linen-shirt",
        "price": 2499,
        "image": "https://images.unsplash.com/photo-1598809494396-5b94f54e6133?auto=format&fit=crop&w=800&q=80",
        "hint": "linen shirt",
        "category": "Tops",
        "description": "Stay cool and stylish in this breathable striped linen shirt. Its relaxed fit makes it a perfect choice for warm weather.",
        "featured": false
    },
    {
        "name": "Tailored Black Trousers",
        "slug": "tailored-black-trousers",
        "price": 3999,
        "image": "https://images.unsplash.com/photo-1541022158468-45c1a141c2c0?auto=format&fit=crop&w=800&q=80",
        "hint": "black trousers",
        "category": "Bottoms",
        "description": "Elevate your look with these perfectly tailored black trousers. A versatile piece that's ideal for both office and evening wear.",
        "featured": false
    },
    {
        "name": "Elegant Maxi Dress",
        "slug": "elegant-maxi-dress",
        "price": 4999,
        "image": "https://images.unsplash.com/photo-1572804013427-4d7ca7268211?auto=format&fit=crop&w=800&q=80",
        "hint": "maxi dress",
        "category": "Dresses",
        "description": "Make a statement with this elegant maxi dress. Its flowing design and rich color make it a stunning choice for special occasions.",
        "featured": true
    },
    {
        "name": "Gold Hoop Earrings",
        "slug": "gold-hoop-earrings",
        "price": 1499,
        "image": "https://images.unsplash.com/photo-1615211993242-631165cd3128?auto=format&fit=crop&w=800&q=80",
        "hint": "hoop earrings",
        "category": "Accessories",
        "description": "Classic gold hoop earrings that add a touch of elegance to any look. Lightweight and versatile for everyday wear.",
        "featured": false
    }
];
