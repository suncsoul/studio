
import { products, Product } from '@/lib/products';

export async function getProducts(): Promise<Product[]> {
  // Simulate async operation
  return Promise.resolve(products);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find(p => p.slug === slug);
  // Simulate async operation
  return Promise.resolve(product || null);
}
