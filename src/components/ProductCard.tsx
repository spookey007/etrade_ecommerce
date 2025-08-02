import React from 'react';
import Image from "next/image";
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <Image
        src={image}
        alt={title}
        fill
        quality={30}
        loading="lazy"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23374151'/%3E%3C/svg%3E`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">${price.toFixed(2)}</p>
          <button
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-medium 
              transform transition-all duration-200 hover:bg-indigo-500 active:scale-95
              shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm"
          >
            Add to Cart
          </button>
      </div>
    </div>
  );
};

export default ProductCard;