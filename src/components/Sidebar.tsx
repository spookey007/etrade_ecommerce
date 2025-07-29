import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 focus:outline-none"
            aria-label="Close sidebar"
          >
            &#x2715;
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="block hover:text-indigo-400" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="block hover:text-indigo-400" onClick={onClose}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-indigo-400" onClick={onClose}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="block hover:text-indigo-400" onClick={onClose}>
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
