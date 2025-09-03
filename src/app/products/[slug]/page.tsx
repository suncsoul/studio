"use client";

import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { CartContext } from '@/context/CartContext';
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { products, addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast()

  useEffect(() => {
    if (products.length > 0) {
      const fetchedProduct = products.find(p => p.slug === slug);
      setProduct(fetchedProduct || null);
      setLoading(false);
    }
  }, [slug, products]);

  if (loading) {
    return <div className="container mx-auto text-center py-24">Loading...</div>;
  }

  if (!product) {
     return <div className="container mx-auto text-center py-24">Product not found</div>;
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    })
  };

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex justify-center items-start">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image || 'https://placehold.co/800x800'}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover w-full h-full"
                data-ai-hint={product.hint}
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl text-primary mb-6">₹{product.price.toFixed(2)}</p>
            <div className="prose dark:prose-invert text-muted-foreground mb-8 text-lg" dangerouslySetInnerHTML={{ __html: product.description }} />
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 border rounded-md p-2">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Category: <span className="text-foreground font-medium">{product.category}</span></p>
            </div>
          </div>
        </div>
      </div>

       {/* Related Products */}
       <div className="bg-muted/50 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.slug} className="group relative border border-border/20 rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card flex flex-col">
                <Link href={`/products/${relatedProduct.slug}`} className="absolute inset-0 z-10" aria-label={`View ${relatedProduct.name}`}></Link>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <Image
                    src={relatedProduct.image || 'https://placehold.co/400x400'}
                    alt={relatedProduct.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={relatedProduct.hint}
                  />
                </div>
                <div className="p-4 text-center flex-grow flex flex-col justify-between">
                  <div className='h-20 flex flex-col justify-center'>
                    <h3 className="text-lg font-semibold text-card-foreground truncate">{relatedProduct.name}</h3>
                    <p className="text-md text-muted-foreground">₹{relatedProduct.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
