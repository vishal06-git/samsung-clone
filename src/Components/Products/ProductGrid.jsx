import React from 'react';
import ProductCard from './ProductCard';

// NAYA: Products = [] default value set ki taaki undefined data aane par site crash na ho
const ProductGrid = ({ Title, Products = [] }) => {
  return (
    // NAYA: Background colors for Dark/Light mode aur py-20 (extra spacing) for premium feel
    <section className="py-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Title */}
        {Title && (
          // NAYA: text-5xl on large screens, font-extrabold, tight tracking
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-14 text-black dark:text-white transition-colors duration-300">
            {Title}
          </h2>
        )}

        {/* CSS Grid for Cards or Empty State */}
        {Products.length > 0 ? (
          // NAYA: gap-x aur gap-y ko alag set kiya taaki rows ke beech mein thoda zyada space rahe
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
            {Products.map((Item) => (
              <ProductCard key={Item.Id} Product={Item} />
            ))}
          </div>
        ) : (
          // NAYA: Agar koi product nahi hai toh ye clean message dikhega
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              No products available at the moment.
            </p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default ProductGrid;