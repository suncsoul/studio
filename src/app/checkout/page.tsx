"use client"

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const router = useRouter();
  const { toast } = useToast();

  const shippingCost = 50;
  const finalTotal = total + shippingCost;
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process payment here
    console.log("Placing order...");
    
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is being processed.",
    });

    clearCart();
    router.push('/');
  }

  if (cartItems.length === 0) {
    // Redirect to home if cart is empty, maybe after a small delay or on component mount
    if (typeof window !== 'undefined') {
        router.push('/');
    }
    return null; // Render nothing while redirecting
  }

  return (
    <div className="bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
          {/* Shipping Details */}
          <div className="lg:col-span-2 bg-background p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <Input id="name" name="name" type="text" placeholder="John Doe" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
               <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">Street Address</label>
                <Input id="address" name="address" type="text" placeholder="123 Main St" required />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-muted-foreground mb-1">City</label>
                <Input id="city" name="city" type="text" placeholder="New York" required />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-muted-foreground mb-1">ZIP Code</label>
                <Input id="zip" name="zip" type="text" placeholder="10001" required />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mt-10 mb-6">Payment Method</h2>
            <p className="text-muted-foreground">For this demo, payment is simulated. Click "Place Order" to complete.</p>
          </div>
          
          {/* Order Summary */}
          <div className="bg-background p-8 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.slug} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t my-6 pt-6 space-y-4">
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
            <Button type="submit" size="lg" className="w-full mt-6">
                Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
