import React from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { WishlistItems, ToggleWishlist } = useWishlist();
  const { AddToCart } = useCart();

  return (
    // NAYA: pt-28 (Navbar overlap fix) and Complete Dark Mode Sync
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <h1 className="text-4xl md:text-5xl font-black mb-12 flex items-center gap-4 tracking-tight animate-fade-in-up">
          <Heart className="w-10 h-10 text-red-500 fill-red-500" /> My Wishlist
        </h1>

        {WishlistItems.length === 0 ? (
          // NAYA: Premium Empty State for Dark & Light Mode
          <div className="text-center py-24 bg-gray-50 dark:bg-[#151515] rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-700 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-24 h-24 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Your wishlist is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium text-lg max-w-md mx-auto">
              Save your favorite Samsung products here and come back to them anytime.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {WishlistItems.map((product) => (
              // NAYA: Premium Product Card matching our ProductGrid
              <div key={product.Id} className="bg-white dark:bg-[#151515] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 relative group hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm hover:shadow-xl">
                
                {/* Remove Button */}
                <button 
                  onClick={() => ToggleWishlist(product)}
                  className="absolute top-6 right-6 p-2.5 bg-white dark:bg-[#222] shadow-sm border border-gray-100 dark:border-gray-700 rounded-full text-gray-400 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 hover:scale-110 transition-all duration-300 z-10"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Image Box */}
                <div className="w-full aspect-square bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-2xl p-6 mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.ImageUrl || (product.images && product.images[0])} 
                    alt={product.Name} 
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                
                {/* Product Info */}
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">
                  {product.Category || 'Samsung Device'}
                </p>
                <h3 className="font-bold text-xl md:text-2xl mb-1 text-black dark:text-white line-clamp-1">
                  {product.Name}
                </h3>
                <p className="text-xl font-bold mb-8 text-black dark:text-gray-300">
                  ₹{product.Price.toLocaleString('en-IN')}
                </p>
                
                {/* Add to Cart Button */}
                <button 
                  // Fallback for color selection since wishlist might not have selectedColor saved in old state
                  onClick={() => AddToCart(product, product.selectedColor || (product.colors ? product.colors[0] : 'Standard'))}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-full font-bold hover:scale-[1.02] flex justify-center items-center gap-2 transition-transform duration-300 shadow-md"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;