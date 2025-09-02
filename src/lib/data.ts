import { products, Product } from '@/lib/products';

// This function now simulates an async API call to get all products from the local file.
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return products;
}

// This function now simulates an async API call to get a single product by its slug.
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  const product = products.find((p) => p.slug === slug);
  return product || null;
}
