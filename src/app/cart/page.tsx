'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../components/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '../../components/LoadingAnimation';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack/ScrollStack';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Ensure this component only renders on the client side
  if (!isClient) {
    setIsClient(true);
    return null;
  }

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

  return (
    <div className="bg-transparent min-h-screen flex flex-col">
      {isLoading && <LoadingAnimation />}
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full  mt-20">
        <h1 className="text-2xl font-bold mb-6 text-white">Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</h1>
        
        {cartItems.length === 0 ? (
          <div className="rounded-lg p-6 text-white">
            <p>Your cart is currently empty.</p>
            <button
              onClick={() => handleNavigation('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="h-[calc(100vh-12rem)] overflow-hidden">
            <ScrollStack 
              itemDistance={50}
              itemScale={0.02}
              itemStackDistance={20}
              stackPosition="10%"
              scaleEndPosition="5%"
              baseScale={0.9}
              className="scrollbar-hidden"
            >
              {cartItems.map((item) => (
                <ScrollStackItem key={`${item.product._id}-${item.selectedSize}`}>
                  <div className="rounded-lg text-white flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">{item.product.title}</h2>
                      <p className="text-gray-300">Size: {item.selectedSize}</p>
                      <p className="text-lg font-bold text-indigo-400">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center mt-4">
                        <div className="flex items-center border border-gray-600 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.product._id, item.selectedSize, item.quantity - 1)}
                            className="px-3 py-1 text-lg"
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product._id, item.selectedSize, item.quantity + 1)}
                            className="px-3 py-1 text-lg"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.product._id, item.selectedSize)}
                          className="ml-4 text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </ScrollStackItem>
              ))}
              <ScrollStackItem>
                <div className=" rounded-lg p-6 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">Total:</span>
                    <span className="text-2xl font-bold">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button 
                      onClick={() => handleNavigation('/products')}
                      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Continue Shopping
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}