import { products } from '@/lib/products';
import ProductClientPage from './ProductClientPage';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Add 'async' and await the params
export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params promise
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  const relatedProducts = products.filter(p => p.category === product?.category && p.slug !== product?.slug).slice(0, 4);

  if (!product) {
    return <div className="container mx-auto text-center py-24">Product not found</div>;
  }

  return (
    <ProductClientPage product={product} relatedProducts={relatedProducts} allProducts={products} />
  );
}