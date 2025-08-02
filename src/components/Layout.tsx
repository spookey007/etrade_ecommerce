"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const frontendPaths = ['/', '/cart', '/about-us'];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent">
        <Header />
        <main className="flex-1 px-4 max-w-7xl mx-auto w-full pt-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFrontend = frontendPaths.includes(pathname);

  return (
    <div className="min-h-screen flex bg-transparent">
      {isFrontend ? (
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 px-4 max-w-7xl mx-auto w-full pt-20">
            {children}
          </main>
          <Footer />
        </div>
      ) : (
        <>
          <Sidebar isOpen={true} onClose={() => {}} />
          <main className="flex-1 px-4 max-w-7xl mx-auto w-full pt-20">
            {children}
          </main>
        </>
      )}
    </div>
  );
}
