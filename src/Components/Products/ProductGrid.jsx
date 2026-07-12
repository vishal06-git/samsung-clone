import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ Title, Products }) => {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        {Title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {Title}
          </h2>
        )}

        {/* CSS Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {Products.map((Item) => (
            <ProductCard key={Item.Id} Product={Item} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ProductGrid;