import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ Product }) => {
  if (!Product) return null;

  return (
    <Link 
      to={`/product/${Product.Id}`} 
      className="group flex flex-col p-6 bg-white dark:bg-[#151515] border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      {/* Premium Image Container with Fixed Height for Uniformity */}
      <div className="w-full h-72 bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-2xl p-6 mb-6 relative flex justify-center items-center overflow-hidden transition-colors duration-300">
        
        {/* Promo Badge */}
        {Product.Badge && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-sm">
            {Product.Badge}
          </span>
        )}
        
        {/* Product Image */}
        <img 
          src={Product.ImageUrl || "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop"} 
          alt={Product.Name} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow px-2 text-center">
        <h3 className="text-xl font-bold text-black dark:text-white mb-1 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {Product.Name}
        </h3>
        
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          {Product.Colors ? `${Product.Colors} Colors` : Product.Category || "New Arrival"}
        </div>

        <div className="mt-auto mb-6">
          {Product.OriginalPrice && (
            <span className="text-sm font-medium text-gray-400 dark:text-gray-600 line-through mr-2">
              ₹{Product.OriginalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {Product.Price && (
            <span className="text-lg font-bold text-black dark:text-white">
              ₹{Product.Price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button className="w-full bg-transparent border-2 border-black dark:border-white text-black dark:text-white font-bold py-3 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm">
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;