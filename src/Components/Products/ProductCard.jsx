import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ Product }) => {
  return (
    <Link to={`/product/${Product.Id}`} className="group flex flex-col cursor-pointer">
      
      {/* 1. Image Container */}
      <div className="bg-[#f4f4f4] rounded-2xl p-6 mb-4 relative flex justify-center items-center h-72 overflow-hidden">
        {/* Promo Badge */}
        {Product.Badge && (
          <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
            {Product.Badge}
          </span>
        )}
        
        {/* Product Image */}
        <img 
          // Agar real image load na ho, toh fallback dummy image dikhegi
          src={Product.ImageUrl || "https://images.samsung.com/is/image/samsung/assets/in/microsite/in_corporate/22072_Seo_TV_370x160-Copy.jpg?$370_160_JPG$"} 
          alt={Product.Name} 
          className="w-48 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 2. Product Details (Text & Buttons) */}
      <div className="flex flex-col flex-grow px-2">
        <h3 className="text-[16px] font-bold text-black mb-1 leading-tight">
          {Product.Name}
        </h3>
        
        <div className="text-xs text-gray-500 mb-3">
          {Product.Colors || 1} Colors
        </div>

        <div className="mt-auto">
          {Product.OriginalPrice && (
            <span className="text-sm text-gray-400 line-through mr-2">
              ₹{Product.OriginalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {Product.Price && (
            <span className="text-lg font-bold text-black">
              ₹{Product.Price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button className="mt-4 w-full bg-white border border-black text-black font-bold py-2.5 rounded-full hover:bg-black hover:text-white transition-colors text-sm">
          Buy Now
        </button>
      </div>
      
    </Link>
  );
};

export default ProductCard;