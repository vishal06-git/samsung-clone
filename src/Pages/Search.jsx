import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import ProductGrid from '../Components/Products/ProductGrid';

const Search = () => {
  const [SearchQuery, setSearchQuery] = useState('');

  // Combined mock database for search purposes
  const AllProducts = [
    { Id: 1, Name: "Galaxy S24 Ultra", Price: 129999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1707166138612-4ebbc7ebf779?q=80&w=600&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1691152011702-86872714c30c?q=80&w=600&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, Category: "Wearable", ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, Category: "Audio", ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=600&auto=format&fit=crop" },
    { Id: 5, Name: "Galaxy S23 FE", Price: 59999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=600&auto=format&fit=crop" }
  ];

  // Filter logic: Check if the product name includes the typed query (case-insensitive)
  const FilteredProducts = AllProducts.filter(product => 
    product.Name.toLowerCase().includes(SearchQuery.toLowerCase())
  );

  return (
    <div className="w-full pt-8 min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-b-2 border-black text-2xl md:text-4xl py-4 pr-12 focus:outline-none font-bold placeholder-gray-300 bg-transparent"
            autoFocus
          />
          <SearchIcon className="absolute right-4 top-6 w-8 h-8 text-black" />
        </div>

        {/* Results Info */}
        <div className="mb-8">
          {SearchQuery && (
            <h2 className="text-xl font-bold">
              {FilteredProducts.length} result(s) found for "{SearchQuery}"
            </h2>
          )}
        </div>

      </div>

      {/* Show filtered products using our existing Grid component */}
      {FilteredProducts.length > 0 ? (
        <ProductGrid Products={FilteredProducts} />
      ) : (
        <div className="text-center text-gray-500 mt-20 text-xl">
          No products match your search. Try "Galaxy" or "Watch".
        </div>
      )}
    </div>
  );
};

export default Search;