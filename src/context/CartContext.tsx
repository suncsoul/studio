"use client"

import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { products as initialProducts, Product } from '@/lib/products';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

export const CartContext = createContext<CartContextType>({
    products: [],
    setProducts: () => {},
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    useEffect(() => {
        setIsClient(true);
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);
    
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }, [products, isClient]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isClient]);


    const addToCart = (product: Product, quantity: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.slug === product.slug);
            if (existingItem) {
                return prevItems.map(item =>
                    item.slug === product.slug
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.slug !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.slug === productId ? { ...item, quantity } : item
                )
            );
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                products,
                setProducts,
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
