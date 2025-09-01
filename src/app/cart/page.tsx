"use client"

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, total } = useContext(CartContext);
  
  const shippingCost = 50;
  const finalTotal = total + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-4xl font-bold mt-8">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-4 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-8">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Your Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-background p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Cart Items ({cartItems.length})</h2>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.slug} className="flex flex-col sm:flex-row gap-6 border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="w-full sm:w-32 h-32 flex-shrink-0">
                     <Image
                        src={item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full rounded-md"
                        data-ai-hint={item.hint}
                      />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.slug}`} className="text-lg font-semibold hover:text-primary transition-colors">{item.name}</Link>
                      <p className="text-muted-foreground">{item.category}</p>
                    </div>
                     <p className="text-lg font-bold text-primary sm:hidden mt-2">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start sm:items-center sm:gap-8">
                    <div className="flex items-center gap-2 border rounded-md p-1">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.slug, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.slug, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                     <p className="text-lg font-bold text-primary hidden sm:block">₹{(item.price * item.quantity).toFixed(2)}</p>
                     <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.slug)} className="text-muted-foreground hover:text-destructive">
                       <Trash2 className="h-5 w-5" />
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-background p-6 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-semibold">₹{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-semibold">₹{shippingCost.toFixed(2)}</p>
              </div>
               <div className="border-t pt-4 mt-4 space-y-4">
                 <div className="flex justify-between text-xl font-bold">
                    <p>Total</p>
                    <p>₹{finalTotal.toFixed(2)}</p>
                 </div>
               </div>
            </div>
            <Button asChild size="lg" className="w-full mt-8">
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
