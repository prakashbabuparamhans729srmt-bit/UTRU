
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
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
  deliveryFee: number;
  platformFee: number;
  couponCode: string | null;
  discount: number;
  finalTotal: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS: { [key: string]: { type: 'percent' | 'fixed'; value: number } } = {
  'UCLAP10': { type: 'percent', value: 10 },
  'UCLAP50': { type: 'fixed', value: 50 },
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
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
        const savedCoupon = localStorage.getItem('couponCode');
        if (savedCoupon && VALID_COUPONS[savedCoupon]) {
            setCouponCode(savedCoupon);
        }

      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem('cart');
        localStorage.removeItem('couponCode');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(items));
       if (couponCode) {
        localStorage.setItem('couponCode', couponCode);
      } else {
        localStorage.removeItem('couponCode');
      }
    }
  }, [items, couponCode, isClient]);

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
    setCouponCode(null);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = 50;
  const platformFee = 10;

  const discount = useMemo(() => {
    if (!couponCode || !VALID_COUPONS[couponCode] || total === 0) return 0;
    const coupon = VALID_COUPONS[couponCode];
    if (coupon.type === 'percent') {
      return (total * coupon.value) / 100;
    }
    if (coupon.type === 'fixed') {
      return Math.min(coupon.value, total + deliveryFee + platformFee); // Cannot have discount greater than total amount
    }
    return 0;
  }, [couponCode, total]);
  
  const finalTotal = total + deliveryFee + platformFee - discount;

  const applyCoupon = (code: string): boolean => {
    const upperCaseCode = code.toUpperCase();
    if (VALID_COUPONS[upperCaseCode]) {
        setCouponCode(upperCaseCode);
        return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };


  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateItemQuantity, clearCart, total, deliveryFee, platformFee, couponCode, discount, finalTotal, applyCoupon, removeCoupon }}>
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
