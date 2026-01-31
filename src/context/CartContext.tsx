'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Service } from '@/lib/services';

export interface CartItem extends Service {
  cartItemId: string; // Unique ID for the cart entry
  imageUrl: string;
  selectedDate: Date;
  selectedTime: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId' | 'quantity'>, quantity: number) => 'added' | 'updated';
  removeFromCart: (cartItemId: string) => void;
  updateItemQuantity: (cartItemId: string, quantity: number) => void;
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

  const addToCart = (item: Omit<CartItem, 'cartItemId' | 'quantity'>, quantity: number): 'added' | 'updated' => {
    const cartItemId = `${item.id}-${item.selectedDate.toISOString()}-${item.selectedTime}`;
    
    const existingItem = items.find((i) => i.cartItemId === cartItemId);
    const action: 'added' | 'updated' = existingItem ? 'updated' : 'added';

    setItems((prevItems) => {
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        // If item doesn't exist, add it to the cart
        const newItem: CartItem = { ...item, cartItemId, quantity };
        return [...prevItems, newItem];
      }
    });

    return action;
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };
  
  const updateItemQuantity = (cartItemId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.cartItemId !== cartItemId);
      }
      return prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
    });
  };


  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateItemQuantity, clearCart, total }}>
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
