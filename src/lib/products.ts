export type Product = {
  name: string;
  slug: string;
  price: number;
  image: string;
  hint: string;
  // Category can be a string now, as it will come from WordPress
  category: string; 
  description: string;
  featured: boolean;
};

// The static products array is no longer needed, as data will be fetched from WordPress.
// You can keep it for reference or local development, but it won't be used in production.
export const products: Product[] = [];
