import React from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { WishlistItems, ToggleWishlist } = useWishlist();
  const { AddToCart } = useCart();

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 min-h-[70vh]">
      <h1 className="text-4xl font-black mb-10 flex items-center gap-3">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" /> My Wishlist
      </h1>

      {WishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save your favorite Samsung products here.</p>
          <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WishlistItems.map((product) => (
            <div key={product.Id} className="bg-white border border-gray-200 rounded-3xl p-6 relative group hover:shadow-xl transition-all duration-300">
              
              {/* Remove Button */}
              <button 
                onClick={() => ToggleWishlist(product)}
                className="absolute top-4 right-4 p-2 bg-white shadow-sm border border-gray-100 rounded-full text-red-500 hover:scale-110 transition-transform z-10"
                title="Remove from wishlist"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="w-full h-48 bg-[#f4f4f4] rounded-2xl p-4 mb-6 flex items-center justify-center">
                <img src={product.ImageUrl} alt={product.Name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <h3 className="font-bold text-lg mb-1 text-black">{product.Name}</h3>
              <p className="text-xl font-black mb-6">₹{product.Price.toLocaleString('en-IN')}</p>
              
              <button 
                onClick={() => AddToCart(product)}
                className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 flex justify-center items-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;