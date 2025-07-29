"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './ProductGallery';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number, size: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product._id === product._id && item.selectedSize === size
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity, selectedSize: size }];
      }
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.product._id === productId && item.selectedSize === size))
    );
  };

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};