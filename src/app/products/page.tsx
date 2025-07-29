"use client";
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-2 sm:px-4 py-8">
        <h1 className="text-3xl font-extrabold mb-8 text-white tracking-tight text-center">All Products</h1>
        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-colors duration-150 text-base"
            onClick={() => {
              const section = document.getElementById('products-section');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Scroll to Products
          </button>
        </div>
        <section className="flex flex-wrap justify-center gap-8" id="products-section">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              imageURL={p.image}
              altText={p.name}
              title={p.name}
              price={`$${p.price.toFixed(2)}`}
              description={p.description}
              category={p.category}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}