import React, { useState } from 'react';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import ProductGrid from '../Components/Products/ProductGrid';

const Search = () => {
  const [SearchQuery, setSearchQuery] = useState('');

  // NAYA FIX: Pure codebase ke sath synchronised clean database
  const AllProducts = [
    { Id: 1, Name: "Galaxy S26 Ultra", Price: 129999, Category: "Mobile", Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, Category: "Wearable", ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, Category: "Audio", Badge: "Sale", ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" }
  ];

  // Filter logic: Case-insensitive search
  const FilteredProducts = AllProducts.filter(product => 
    product.Name.toLowerCase().includes(SearchQuery.toLowerCase())
  );

  const popularKeywords = ["Ultra", "Fold", "Watch", "Buds"];

  return (
    // NAYA: pt-28 Navbar alignment fix aur complete Dark Mode sync
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Search Input Bar Section */}
        {/* NAYA: Border bottom aur icons dark mode compatible banaye hain */}
        <div className="relative max-w-3xl mx-auto mb-16 group">
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-b-2 border-black dark:border-white text-2xl md:text-5xl py-4 pr-14 focus:outline-none font-black placeholder-gray-300 dark:placeholder-gray-700 bg-transparent tracking-tight transition-all duration-300"
            autoFocus
          />
          <SearchIcon className="absolute right-4 top-6 w-8 h-8 text-black dark:text-white group-focus-within:text-blue-600 transition-colors" />
        </div>

        {/* Dynamic State Layout */}
        {!SearchQuery ? (
          // NAYA: Initial State agar query blank hai toh layout khali nahi lagega
          <div className="text-center py-12 animate-fade-in-up">
            <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
              Popular Suggestions
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularKeywords.map((keyword, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(keyword)}
                  className="px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 font-bold hover:border-black dark:hover:border-white transition-all duration-300 text-sm"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // NAYA: Results Title styled smoothly
          <div className="mb-4 animate-fade-in">
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Search Results ({FilteredProducts.length})
            </h2>
          </div>
        )}

      </div>

      {/* Grid Rendering Area */}
      {SearchQuery && (
        FilteredProducts.length > 0 ? (
          <div className="animate-fade-in">
            <ProductGrid Products={FilteredProducts} />
          </div>
        ) : (
          // NAYA: Empty State design refined for premium look
          <div className="text-center py-24 px-4 animate-fade-in">
            <p className="text-2xl font-bold mb-2">No results found</p>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-base font-medium">
              We couldn't find anything matching "{SearchQuery}". Try checking the spelling or use a different keyword.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Search;