import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Hamara MockDatabase
  const MockDatabase = [
    { Id: 1, Name: "Galaxy S24 Ultra", Price: 129999, ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" },
    { Id: 5, Name: "Galaxy Book3 Pro", Price: 114999, ImageUrl: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?q=80&w=800&auto=format&fit=crop" },
    { Id: 6, Name: "Galaxy Tab S9 Ultra", Price: 119999, ImageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" },
    { Id: 101, Name: "Premium Smart TV", Price: 49999, ImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
    { Id: 102, Name: "Ultra HD Soundbar", Price: 89999, ImageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop" }
  ];

  // Auto-lock body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const filteredProducts = MockDatabase.filter(product =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularSearches = ["Galaxy S24", "Smart TV", "Watch", "Buds"];

  if (!isOpen) return null;

  return (
    // NAYA: Premium Backdrop Blur with slight transparency (bg-opacity-95)
    <div className="fixed inset-0 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-xl z-[100] transition-all duration-300 overflow-y-auto animate-fade-in">
      
      {/* Header with Search Input */}
      <div className="sticky top-0 bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800/60 p-4 md:p-8 z-10">
        <div className="w-full max-w-5xl mx-auto flex items-center gap-4 md:gap-6">
          <Search className="w-7 h-7 md:w-8 md:h-8 text-black dark:text-white flex-shrink-0" />
          
          <input
            type="text"
            autoFocus
            placeholder="Search Samsung products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // NAYA: Fonts updated to match the grand hero style
            className="w-full text-2xl md:text-4xl lg:text-5xl font-black bg-transparent border-none focus:outline-none text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-700 tracking-tight"
          />
          
          <button 
            onClick={() => {
              setSearchQuery('');
              onClose();
            }} 
            className="p-3 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-full transition-colors flex-shrink-0 group"
          >
            <X className="w-8 h-8 md:w-10 md:h-10 text-black dark:text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto p-4 md:p-8 mt-4">
        
        {/* NAYA UI: Initial State - Trending Searches */}
        {!searchQuery && (
          <div className="animate-fade-in-up">
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">
              <TrendingUp className="w-4 h-4" /> Popular Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term)}
                  className="px-6 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white font-medium hover:border-black dark:hover:border-white transition-colors duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Area */}
        {searchQuery && (
          <div className="animate-fade-in-up">
            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">
              Search Results ({filteredProducts.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <Link 
                  key={product.Id} 
                  to={`/product/${product.Id}`}
                  onClick={() => {
                    setSearchQuery('');
                    onClose();
                  }}
                  // NAYA: Premium Card Layout for results
                  className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-gray-50 dark:hover:bg-[#151515] transition-colors duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                >
                  {/* Image Container with Hover Zoom */}
                  <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center p-3 overflow-hidden">
                    <img 
                      src={product.ImageUrl} 
                      alt={product.Name} 
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-xl md:text-2xl text-black dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {product.Name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      ₹{product.Price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Empty State / Not Found */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl font-bold text-black dark:text-white mb-2">No results found</p>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  We couldn't find anything matching "{searchQuery}". Try a different keyword.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default SearchOverlay;