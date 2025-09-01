"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { products as initialProducts, Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const handleSaveProduct = () => {
    // In a real app, this would be an API call.
    // Here we'll just update the local state.
    if (currentProduct?.slug) { // Editing existing product
      setProducts(products.map(p => p.slug === currentProduct.slug ? currentProduct as Product : p));
    } else { // Adding new product
      const newProduct = {
        ...currentProduct,
        slug: currentProduct?.name?.toLowerCase().replace(/\s+/g, '-') || `new-product-${Date.now()}`,
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };
  
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      category: 'Tops',
      description: '',
      image: '',
      hint: '',
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    // In a real app, this would be an API call.
    if(window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.slug !== slug));
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentProduct(prev => ({ ...prev, featured: checked }));
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Management</CardTitle>
        <Button onClick={handleAddNew}>Add New Product</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell>
                  <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-md object-cover"/>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.slug)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{currentProduct?.slug ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {currentProduct?.slug ? 'Make changes to your product here.' : 'Add a new product to your store.'} Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={currentProduct?.name || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={currentProduct?.price || 0} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input id="category" name="category" value={currentProduct?.category || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" value={currentProduct?.description || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image URL</Label>
              <Input id="image" name="image" value={currentProduct?.image || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">Image Hint</Label>
              <Input id="hint" name="hint" value={currentProduct?.hint || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">Featured</Label>
              <Checkbox id="featured" checked={currentProduct?.featured || false} onCheckedChange={handleCheckboxChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveProduct}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// These are needed for shadcn UI components, lets create them.
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return (
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof import('@radix-ui/react-checkbox').Root>,
  React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-checkbox').Root>
>(({ className, ...props }, ref) => (
  <import('@radix-ui/react-checkbox').Root
    ref={ref}
    className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
    {...props}
  >
    <import('@radix-ui/react-checkbox').Indicator
      className="flex items-center justify-center text-current"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </import('@radix-ui/react-checkbox').Indicator>
  </import('@radix-ui/react-checkbox').Root>
))
Checkbox.displayName = 'Checkbox'

const Label = React.forwardRef<
  React.ElementRef<typeof import('@radix-ui/react-label').Root>,
  React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-label').Root>
>(({ className, ...props }, ref) => (
  <import('@radix-ui/react-label').Root
    ref={ref}
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    {...props}
  />
))
Label.displayName = 'Label'
