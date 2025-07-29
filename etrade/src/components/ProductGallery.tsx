
return (
  <section
    className="w-full min-h-screen py-12 px-6 bg-transparent"
    id="products-section"
  >
    <div className="max-w-7xl mx-auto">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 p-4 scrollbar-custom"
        style={{
          minHeight: '600px',
        }}
      >
        {getCurrentPageProducts().map((p) => (
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
                  {/* Top section with product name and new badge */}
                  <div className="z-10">
                    {p.isNew && (
                      <span className="inline-block px-2 py-1 text-xs bg-indigo-600 text-white rounded-md mb-2">
                        New Arrival
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 drop-shadow-lg">
                      {p.title}
                    </h3>
                  </div>

                  {/* Spacer to push content to bottom */}
                  <div className="flex-grow"></div>

                  {/* Bottom section with price and add to cart */}
                  <div className="relative z-10">
                    {/* Price info with shadow at bottom left */}
                    <div className="text-2xl font-bold text-white drop-shadow-lg">
                      ${p.price.toFixed(2)}
                    </div>

                    {/* Add to cart button - hidden by default, appears on hover at bottom center */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[200px] opacity-0 translate-y-4 
                      group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(p);
                        }}
                        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-medium 
                          transform transition-all duration-200 hover:bg-indigo-500 active:scale-95
                          shadow-lg hover:shadow-indigo-500/50 backdrop-blur-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                </div>
              }
              // Adding hover shadow effect
              cardClassName="group-hover:shadow-2xl"
            />
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                  currentPage === index + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
    <Toast 
      message="Added to cart successfully!"
      isVisible={showToast}
      onHide={() => setShowToast(false)}
    />
  </section>
);
