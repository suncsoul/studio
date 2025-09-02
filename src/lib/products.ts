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

// This is now just a type definition. The actual products are fetched from WordPress.
export const products: Product[] = [];
