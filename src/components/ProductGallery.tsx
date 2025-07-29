"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import TiltedCard from './TiltedCard/TiltedCard';
import Modal from './Modal';
import Toast from './Toast';
import { useCart } from './CartContext';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack';

export interface Product {
  _id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: string;
  discountedPrice: number;
  description: string;
  category: string;
  type: string;
  stock: number;
  brand: string;
  size: string[];
  rating: number;
  isNew: boolean;
}

interface ProductResponse {
  data: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export default function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Added to cart successfully!');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 8; // Number of products per page

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data: ProductResponse) => {
        setProducts(data.data);
        setTotalPages(Math.ceil(data.data.length / productsPerPage));
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setSelectedVariation(product.size.length > 0 ? product.size[0] : '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCartClick = (product: Product) => {
    openModal(product);
  };

  const { addToCart } = useCart();

  const handleModalSubmit = () => {
    if (selectedProduct) {
      // Create a flying animation element
      const productImage = document.createElement('img');
      productImage.src = selectedProduct.image;
      productImage.className = 'fixed w-16 h-16 rounded-full z-50 pointer-events-none';
      productImage.style.left = '0px';
      productImage.style.top = '0px';
      
      // Get position of the clicked product (we'll need to track this)
      const rect = document.getElementById('add-to-cart-button')?.getBoundingClientRect();
      const cartRect = document.getElementById('cart-icon')?.getBoundingClientRect();
      
      if (rect && cartRect) {
        productImage.style.left = `${rect.left + rect.width/2}px`;
        productImage.style.top = `${rect.top + rect.height/2}px`;
        document.body.appendChild(productImage);
        
        // Animate to cart
        const startX = rect.left + rect.width/2;
        const startY = rect.top + rect.height/2;
        const endX = cartRect.left + cartRect.width/2;
        const endY = cartRect.top + cartRect.height/2;
        
        // Calculate control point for bezier curve (above the path)
        const controlX = (startX + endX) / 2;
        const controlY = Math.min(startY, endY) - 100;
        
        let start: number | null = null;
        const duration = 1000;
        
        const animate = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const t = Math.min(progress / duration, 1);
          
          // Quadratic bezier curve calculation
          const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
          const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
          
          productImage.style.left = `${x}px`;
          productImage.style.top = `${y}px`;
          
          // Add scaling effect
          const scale = 1 - 0.5 * t;
          productImage.style.transform = `scale(${scale})`;
          productImage.style.opacity = `${1 - t * 0.5}`;
          
          if (t < 1) {
            requestAnimationFrame(animate);
          } else {
            // Animation complete
            document.body.removeChild(productImage);
          }
        };
        
        requestAnimationFrame(animate);
      }
      
      // Add to cart
      addToCart(selectedProduct, selectedQuantity, selectedVariation);
      setShowToast(true);
      setToastMessage(`Added ${selectedQuantity} ${selectedProduct.title} to cart`);
      closeModal();
    }
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    // Simulate loading delay for demonstration
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 500);
  };

  return (
    <section
      className="w-full py-2 px-6 bg-transparent"
      id="products-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop view - regular grid */}
        <div 
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 p-4 scrollbar-custom"
          style={{
            minHeight: '850px',
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full col-span-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            getCurrentPageProducts().map((p) => (
              <div
                key={p._id}
                className="w-full hover:z-10 group"
              >
                <TiltedCard
                  imageSrc={p.image}
                  altText={p.title}
                  captionText={p.title}
                  containerHeight="400px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={6}
                  scaleOnHover={1.02}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 flex flex-col p-4">
                      {/* Top section with new badge only */}
                      <div className="z-10">
                        {p.isNew && (
                          <motion.span 
                            className="inline-block px-2 py-1 text-xs bg-indigo-600 text-white rounded-md mb-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            New Arrival
                          </motion.span>
                        )}
                      </div>

                      {/* Spacer to push content to bottom */}
                      <div className="flex-grow"></div>

                      {/* Bottom section with product name, price and add to cart */}
                      <motion.div 
                        className="relative z-10"
                                          initial={{  y: 30 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-16">
                          <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-1">
                            {p.title}
                          </h3>
                          <div className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            ${p.price.toFixed(2)}
                          </div>
                        </div>

                        {/* Add to cart button - hidden by default, appears on hover at bottom center */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[200px] 
                          opacity-100 translate-y-0 transition-all duration-300 ease-out md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:translate-y-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCartClick(p);
                            }}
                            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-medium 
                              transform transition-all duration-200 hover:bg-indigo-500 active:scale-95
                              shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </motion.div>

                      {/* Improved gradient overlay for better contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                    </div>
                  }
                />
              </div>
            ))
          )}
        </div>
        
        {/* Mobile view - ScrollStack */}
        <div className="sm:hidden h-[calc(100vh-8rem)] overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : getCurrentPageProducts().length > 0 ? (
            <ScrollStack 
              itemDistance={10}
              itemScale={0.015}
              itemStackDistance={15}
              stackPosition="5%"
              scaleEndPosition="8%"
              baseScale={0.92}
              className="scrollbar-hidden h-full"
            >
              {getCurrentPageProducts().map((p) => (
                <ScrollStackItem key={p._id}>
                  <div className="w-full hover:z-10 group">
                    <TiltedCard
                      imageSrc={p.image}
                      altText={p.title}
                      captionText={p.title}
                      containerHeight="400px"
                      containerWidth="100%"
                      imageHeight="400px"
                      imageWidth="100%"
                      rotateAmplitude={6}
                      scaleOnHover={1.02}
                      showTooltip={false}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="absolute inset-0 flex flex-col p-4">
                          {/* Top section with new badge only */}
                          <div className="z-10">
                            {p.isNew && (
                              <motion.span 
                                className="inline-block px-2 py-1 text-xs bg-indigo-600 text-white rounded-md mb-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                New Arrival
                              </motion.span>
                            )}
                          </div>

                          {/* Spacer to push content to bottom */}
                          <div className="flex-grow"></div>

                          {/* Bottom section with product name, price and add to cart */}
                          <motion.div 
                            className="relative z-10"
                                              initial={{  y: 30 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mb-16">
                              <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-1">
                                {p.title}
                              </h3>
                              <div className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                ${p.price.toFixed(2)}
                              </div>
                            </div>

                            {/* Add to cart button - always visible on mobile */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[200px] 
                              opacity-100 translate-y-0 transition-all duration-300 ease-out">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleAddToCartClick(p);
                                }}
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-medium 
                                  transform transition-all duration-200 hover:bg-indigo-500 active:scale-95
                                  shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </motion.div>

                          {/* Improved gradient overlay for better contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                        </div>
                      }
                    />
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-white">No products available</p>
            </div>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 rounded-lg bg-transparent border border-indigo-600 text-indigo-400 hover:bg-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={isLoading}
                  className={`w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                    currentPage === index + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading && currentPage === index + 1 ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-4 py-2 rounded-lg bg-transparent border border-indigo-600 text-indigo-400 hover:bg-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} title={selectedProduct?.title}>
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedProduct.title}</h3>
                <p className="text-lg font-bold text-indigo-400">${selectedProduct.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-300">Quantity</label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-white w-8 text-center">{selectedQuantity}</span>
                <button 
                  onClick={() => setSelectedQuantity(Math.min(selectedProduct.stock, selectedQuantity + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  disabled={selectedQuantity >= selectedProduct.stock}
                >
                  +
                </button>
                <span className="text-sm text-gray-400 ml-2">
                  {selectedProduct.stock} in stock
                </span>
              </div>
            </div>
            
            {selectedProduct.size.length > 0 && (
              <div>
                <label className="block mb-2 font-medium text-gray-300">Size</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedVariation(size)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedVariation === size
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              id="add-to-cart-button"
              onClick={handleModalSubmit}
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Add to Cart - ${(selectedQuantity * selectedProduct.price).toFixed(2)}
            </button>
          </div>
        )}
      </Modal>
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </section>
  );
}