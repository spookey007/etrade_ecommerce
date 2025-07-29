
"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
import GlassSurface from '@/components/GlassSurface/GlassSurface';


export default function Header() {
  const router = useRouter();
  const { getCartCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prevCartCount = useRef(0);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const initialCount = getCartCount();
    setCartCount(initialCount);
    prevCartCount.current = initialCount;
  }, [getCartCount]);

  useEffect(() => {
    const newCount = getCartCount();
    if (newCount > prevCartCount.current) {
      // Trigger animation when items are added
      const cartIcon = document.getElementById('cart-icon');
      const mobileCartIcon = document.getElementById('mobile-cart-icon');
      
      if (cartIcon) {
        cartIcon.classList.add('animate-bounce');
        setTimeout(() => {
          cartIcon.classList.remove('animate-bounce');
        }, 1000);
      }
      
      if (mobileCartIcon) {
        mobileCartIcon.classList.add('animate-bounce');
        setTimeout(() => {
          mobileCartIcon.classList.remove('animate-bounce');
        }, 1000);
      }
    }
    
    setCartCount(newCount);
    prevCartCount.current = newCount;
  }, [getCartCount]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 min-w-[80%] h-16 w-4/5 md:w-2/5 z-50">
      <GlassSurface 
        width='100%' 
        height={50}
        borderRadius={10}
        className=""
      >
        <div className="px-3 py-4 flex justify-between items-center h-full relative transition-all duration-500">
          {/* Logo on the left */} 
          <div className="flex items-center">
            <Link href="/" className="text-2xl tracking-wider" style={{ fontFamily: "'Philly Sans', sans-serif" }}>
              etrade
            </Link>
          </div>

          {/* Navigation in the center */}
          <nav className="hidden md:flex md:space-x-6 items-center md:ml-10">
            <Link
              href="/"
              onClick={(e) => handleNavigation(e, '/')}
              className="relative no-underline hover:no-underline text-white hover:text-white text-lg py-2 px-4 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:scale-x-100"
            >
              Home
            </Link>

            <Link
              href="/about-us"
              onClick={(e) => handleNavigation(e, '/about-us')}
              className="relative no-underline hover:no-underline text-white hover:text-white text-lg py-2 px-4 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:scale-x-100"
            >
              About Us
            </Link>
          </nav>

          {/* Cart icon on the right */}
          <div className="hidden md:flex items-center justify-end">
            <Link
              href="/cart"
              onClick={(e) => handleNavigation(e, '/cart')}
              className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white/20 px-4 font-medium text-white transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:bg-white/30 active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
              title="Cart"
            >
              <div className="relative" id="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                ) : null}
              </div>
            </Link>
          </div>

          {/* Mobile navigation */}
          <nav className="md:hidden flex items-center space-x-4">
            <Link href="/cart" title="Cart" className="relative">
              <div id="mobile-cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                ) : null}
              </div>
            </Link>
            <button 
              className="text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </GlassSurface>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-white text-xl">Menu</span>
              <button 
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4">
              <Link
                href="/"
                onClick={(e) => {
                  handleNavigation(e, '/');
                  toggleSidebar();
                }}
                className="block py-2 text-white hover:text-indigo-400"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                onClick={(e) => {
                  handleNavigation(e, '/about-us');
                  toggleSidebar();
                }}
                className="block py-2 text-white hover:text-indigo-400"
              >
                About Us
              </Link>
              <Link
                href="/products"
                onClick={(e) => {
                  handleNavigation(e, '/products');
                  toggleSidebar();
                }}
                className="block py-2 text-white hover:text-indigo-400"
              >
                Products
              </Link>
              <Link
                href="/cart"
                onClick={(e) => {
                  handleNavigation(e, '/cart');
                  toggleSidebar();
                }}
                className="block py-2 text-white hover:text-indigo-400"
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}