import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const cartItems = [
    {
      name: "Classic Denim Jacket",
      price: 79.99,
      image: "https://placehold.co/600x400.png",
      hint: "denim jacket",
      quantity: 1,
      size: "M",
      color: "Blue"
    },
    {
      name: "Leather Ankle Boots",
      price: 129.99,
      image: "https://placehold.co/600x400.png",
      hint: "leather boots",
      quantity: 1,
      size: "8.5",
      color: "Black"
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ul role="list" className="divide-y divide-gray-200">
            {cartItems.map((product) => (
              <li key={product.name} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover object-center"
                    data-ai-hint={product.hint}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link href="#">{product.name}</Link>
                      </h3>
                      <p className="ml-4">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Size: {product.size}, Color: {product.color}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <label htmlFor={`quantity-${product.name}`} className="sr-only">Quantity</label>
                       <Input
                         id={`quantity-${product.name}`}
                         type="number"
                         min="1"
                         defaultValue={product.quantity}
                         className="h-8 w-16 text-center"
                       />
                    </div>
                    <div className="flex">
                      <Button variant="ghost" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Shipping estimate</p>
                <p className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-medium text-gray-900">
                <p>Order total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
            <Button className="w-full mt-6">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
