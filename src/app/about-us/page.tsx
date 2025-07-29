'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '../../components/LoadingAnimation';

export default function AboutUsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    
    // Simulate a small delay to show the loading animation
    setTimeout(() => {
      router.push(href);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {isLoading && <LoadingAnimation />}
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-white">About ETRADE</h1>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-white mb-8">
          <p className="mb-4">
            ETRADE is a leading e-commerce platform dedicated to providing high-quality products and exceptional customer service. 
            Founded in 2023, we've quickly become a trusted name in online retail.
          </p>
          
          <p className="mb-4">
            Our mission is to make shopping easy, convenient, and enjoyable for everyone. We carefully curate our product selection 
            to ensure that we offer only the best items at competitive prices.
          </p>
          
          <p className="mb-4">
            At ETRADE, we believe in building long-term relationships with our customers based on trust, quality, and value. 
            Our team is committed to providing an outstanding shopping experience from the moment you visit our site until your 
            order arrives at your doorstep.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-3">Our Values</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Customer satisfaction is our top priority</li>
              <li>Quality products at fair prices</li>
              <li>Transparency in all our dealings</li>
              <li>Continuous innovation and improvement</li>
              <li>Environmental responsibility</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-3">Why Choose Us</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fast and reliable shipping</li>
              <li>Easy returns and exchanges</li>
              <li>Secure payment options</li>
              <li>24/7 customer support</li>
              <li>Regular promotions and discounts</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => handleNavigation('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}