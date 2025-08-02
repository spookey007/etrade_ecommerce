"use client";
import Layout from '@/components/Layout';

export default function CartPage() {
  return (
    <Layout>
      <div className="w-full px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          <CartContent />
        </div>
      </div>
    </Layout>
  );
};

import { useCart } from '../../components/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack';
import Image from 'next/image';

function CartContent() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (productId: number, size: string, newQuantity: number) => {
    updateQuantity(productId, size, newQuantity);
  };

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    
    // Simulate a small delay to show the loading animation
    setTimeout(() => {
      router.push(href);
      setIsLoading(false);
    }, 500);
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      {cartItems.length === 0 ? (
        <div className="rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-white/10 text-center mt-8">
          <p className="text-white/90 text-lg mb-6">Your cart is currently empty.</p>
          <button
            onClick={() => handleNavigation('/')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="h-[calc(100vh-12rem)] overflow-hidden mt-8">
              <ScrollStack 
                itemDistance={10}
                itemScale={0.0015}
                itemStackDistance={5}
                stackPosition="5%"
                scaleEndPosition="8%"
                baseScale={0.92}
                className="scrollbar-hidden h-full"
                reducedMotion={false}
              >
            {cartItems.map((item) => (
              <ScrollStackItem key={`${item.product._id}-${item.selectedSize}`}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 relative group">
                      <div className="relative w-full md:w-[120px] h-[120px]">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.title} 
                          fill
                          sizes="(max-width: 768px) 240px, 120px"
                          quality={50}
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23374151'/%3E%3C/svg%3E`}
                          className="object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col md:flex-row md:justify-between gap-4">
                      <div className="flex-grow space-y-2">
                        <h2 className="text-xl font-semibold text-white">{item.product.title}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60">Size:</span>
                          <span className="px-2 py-1 bg-white/10 rounded-full text-sm text-white">{item.selectedSize}</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-400">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 items-start md:items-end">
                        <div className="flex items-center gap-3 bg-white/10 rounded-lg p-1">
                          <button 
                            onClick={() => handleQuantityChange(item.product._id, item.selectedSize, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product._id, item.selectedSize, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.product._id, item.selectedSize)}
                          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}

            <ScrollStackItem>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-white select-none">Total Items:</span>
                    <span className="text-2xl font-bold text-indigo-400">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl text-white select-none">Total:</span>
                    <span className="text-2xl font-bold text-indigo-400">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleNavigation('/')}
                    className="flex-1 bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-6 rounded-xl transition duration-300"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      )}
    </>
  );
}
