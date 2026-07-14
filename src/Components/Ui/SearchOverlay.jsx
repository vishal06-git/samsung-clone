import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // YAHAN THI ERROR: Humne MockDatabase wapas add kar diya hai nayi Unsplash images ke sath
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

  // User jo type karega uske hisaab se products filter honge
  const filteredProducts = MockDatabase.filter(product =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    // NAYA: Dark mode classes add ki hain yahan bhi (dark:bg-[#0f0f0f])
    <div className="fixed inset-0 bg-white dark:bg-[#0f0f0f] z-[100] transition-colors duration-300 overflow-y-auto">
      
      {/* Header with Input */}
      <div className="flex items-center justify-between p-4 md:p-8 border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-4xl mx-auto flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-2xl md:text-4xl font-bold bg-transparent border-none focus:outline-none text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
          />
          <button 
            onClick={() => {
              setSearchQuery('');
              onClose();
            }} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-8 h-8 text-black dark:text-white" />
          </button>
        </div>
      </div>

      {/* Search Results Area */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {searchQuery && (
          <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">
            Search Results ({filteredProducts.length})
          </h3>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchQuery && filteredProducts.map(product => (
            <Link 
              key={product.Id} 
              to={`/product/${product.Id}`}
              onClick={() => {
                setSearchQuery('');
                onClose();
              }}
              className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
            >
              <img 
                src={product.ImageUrl} 
                alt={product.Name} 
                className="w-24 h-24 object-contain bg-gray-100 dark:bg-gray-800 rounded-xl" 
              />
              <div>
                <h4 className="font-bold text-lg text-black dark:text-white">{product.Name}</h4>
                <p className="text-gray-500">₹{product.Price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {searchQuery && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
            No products found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay; 