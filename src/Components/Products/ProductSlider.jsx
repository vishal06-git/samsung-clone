import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useWishlist } from '../../Context/WishlistContext'; 

const ProductSlider = ({ Products, Title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { WishlistItems, ToggleWishlist } = useWishlist(); 

  // Auto-play logic
  useEffect(() => {
    if (!Products || Products.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Products.length);
    }, 4500); // NAYA: 4.5 seconds for a more relaxed, premium pace
    return () => clearInterval(timer); 
  }, [Products]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % Products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? Products.length - 1 : prev - 1));

  if (!Products || Products.length === 0) return null;

  const currentProduct = Products[currentIndex];
  
  const isWishlisted = WishlistItems?.some(item => item.Id === currentProduct.Id);

  return (
    // NAYA: Wrapper me Dark mode support
    <div className="w-full bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20">
        
        {/* Premium Section Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-14 text-black dark:text-white tracking-tight transition-colors duration-300">
          {Title}
        </h2>

        {/* NAYA: Slider Container with Dark Mode Background */}
        <div className="relative w-full max-w-6xl mx-auto bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
          
          {/* Floating Wishlist Button */}
          <button 
            onClick={() => ToggleWishlist(currentProduct)}
            className="absolute top-6 right-6 p-3 bg-white dark:bg-[#2a2a2a] shadow-md hover:shadow-lg rounded-full z-30 hover:scale-105 transition-all duration-300"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart 
              className={`w-[22px] h-[22px] transition-colors duration-300 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-300 hover:text-red-500'
              }`} 
            />
          </button>

          {/* Slide Content - Adding key forces re-render for animation */}
          <div key={currentProduct.Id} className="flex flex-col md:flex-row items-center min-h-[480px] p-8 md:p-16 animate-fade-in-up">
            
            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
              
              {currentProduct.Badge && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm">
                  {currentProduct.Badge}
                </span>
              )}
              
              {/* NAYA: Text colors adapted for dark mode */}
              <h3 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 tracking-tight leading-tight">
                {currentProduct.Name}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium text-lg">
                {currentProduct.Colors || 1} Colors Available
              </p>
              
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-3xl font-bold text-black dark:text-white">
                  ₹{currentProduct.Price.toLocaleString('en-IN')}
                </span>
                {currentProduct.OriginalPrice && (
                  <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-medium">
                    ₹{currentProduct.OriginalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              {/* Premium Hollow Button Style */}
              <Link to={`/product/${currentProduct.Id}`} className="bg-transparent border-2 border-black dark:border-white text-black dark:text-white px-10 py-3.5 rounded-full font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-base shadow-sm">
                Learn More
              </Link>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 relative">
              {/* Subtle background glow effect */}
              <div className="absolute inset-0 bg-white/20 dark:bg-black/20 blur-3xl rounded-full scale-75 z-0"></div>
              <img
                src={currentProduct.ImageUrl}
                alt={currentProduct.Name}
                className="w-72 md:w-[350px] h-auto object-contain drop-shadow-2xl transform transition-transform duration-700 hover:scale-105 z-10"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-3.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black z-20 border border-transparent dark:border-gray-700">
            <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
          </button>
          
          <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-3.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black z-20 border border-transparent dark:border-gray-700">
            <ChevronRight className="w-6 h-6 text-black dark:text-white" />
          </button>

          {/* Dots Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {Products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex 
                    ? 'bg-black dark:bg-white w-10' 
                    : 'bg-gray-300 dark:bg-gray-600 w-2.5 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductSlider;