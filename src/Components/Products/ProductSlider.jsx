import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'; // Heart icon import kiya
import { useWishlist } from '../../Context/WishlistContext'; // Context import kiya

const ProductSlider = ({ Products, Title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { WishlistItems, ToggleWishlist } = useWishlist(); // Wishlist state aur function nikale

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Products.length);
    }, 3500);
    return () => clearInterval(timer); 
  }, [Products.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % Products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? Products.length - 1 : prev - 1));

  if (!Products || Products.length === 0) return null;

  const currentProduct = Products[currentIndex];
  
  // Check karte hain ki current product wishlist me hai ya nahi
  const isWishlisted = WishlistItems?.some(item => item.Id === currentProduct.Id);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-10">{Title}</h2>

      <div className="relative w-full max-w-5xl mx-auto bg-[#f4f4f4] rounded-3xl overflow-hidden shadow-sm group">
        
        {/* NAYA: Floating Wishlist Button */}
        <button 
          onClick={() => ToggleWishlist(currentProduct)}
          className="absolute top-6 right-6 p-3 bg-white shadow-md rounded-full z-30 hover:scale-110 transition-transform duration-200"
          title="Add to Wishlist"
        >
          <Heart 
            className={`w-6 h-6 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>

        <div key={currentProduct.Id} className="flex flex-col md:flex-row items-center min-h-[450px] p-8 md:p-12 animate-fade-in-up">
          
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
            {currentProduct.Badge && (
              <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                {currentProduct.Badge}
              </span>
            )}
            <h3 className="text-4xl font-black text-black mb-4 tracking-tight">{currentProduct.Name}</h3>
            <p className="text-gray-500 mb-8 font-medium">{currentProduct.Colors || 1} Colors Available</p>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-black text-black">₹{currentProduct.Price.toLocaleString('en-IN')}</span>
              {currentProduct.OriginalPrice && (
                <span className="text-xl text-gray-400 line-through font-bold">
                  ₹{currentProduct.OriginalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <Link to={`/product/${currentProduct.Id}`} className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
              View Product
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            <img
              src={currentProduct.ImageUrl}
              alt={currentProduct.Name}
              className="w-72 md:w-80 h-auto object-contain drop-shadow-2xl transform transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 z-20">
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 z-20">
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {Products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-black w-8' : 'bg-gray-300 w-2.5 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;