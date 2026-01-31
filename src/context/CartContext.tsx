'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Service } from '@/lib/services';

export interface CartItem extends Service {
  cartItemId: string; // Unique ID for the cart entry
  imageUrl: string;
  selectedDate: Date;
  selectedTime: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart, (key, value) => {
            if (key === 'selectedDate') {
              return new Date(value);
            }
            return value;
          });
          setItems(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isClient]);

  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `${item.id}-${item.selectedDate.toISOString()}-${item.selectedTime}`;
    
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(i => i.cartItemId === cartItemId);
      
      if (existingItemIndex > -1) {
        // Item with same service, date, and time already exists. Do nothing.
        return prevItems;
      }
      
      const newItem: CartItem = { ...item, cartItemId };
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
