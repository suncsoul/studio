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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
      if (typeof checked === 'boolean') {
        setCurrentProduct(prev => ({ ...prev, featured: checked }));
      }
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
              <Input id="image" name="image" value={currentProduct?.image || ''} onChange={handleInputChange} className="col-span-3" placeholder="https://images.unsplash.com/..." />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">Image Hint</Label>
              <Input id="hint" name="hint" value={currentProduct?.hint || ''} onChange={handleInputChange} className="col-span-3" placeholder="e.g. 'floral dress'" />
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
