"use client";
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/shop', label: 'All Products', icon: '🛍️' },
    { path: '/new-arrivals', label: 'New Arrivals', icon: '✨' },
    { path: '/categories', label: 'Categories', icon: '📑' },
    { path: '/cart', label: 'Shopping Cart', icon: '🛒' },
    { path: '/favorites', label: 'Wishlist', icon: '❤️' },
    { path: '/account', label: 'My Account', icon: '👤' },
    { path: '/orders', label: 'My Orders', icon: '📦' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md text-white z-50 shadow-2xl 
                     shadow-[5px_0_25px_0_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-700/50">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
              >
                Menu
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <motion.ul 
                className="space-y-2"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                  },
                  closed: {}
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300
                        ${pathname === item.path 
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                          : 'hover:bg-gray-800/50 text-gray-300 hover:text-white hover:translate-x-1'
                        }`}
                    >
                      <span className="text-xl transform transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                      <span className="font-medium tracking-wide">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50"
            >
              <div className="flex items-center justify-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  <span className="text-xl">⚙️</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
                  <span className="text-xl">❔</span>
                </button>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
