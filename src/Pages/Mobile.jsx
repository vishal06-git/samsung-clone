import React from 'react';
import ProductGrid from '../Components/Products/ProductGrid';

const Mobile = () => {
  // Yahan sirf Mobile phones ka mock data hai
  const MobileProducts = [
    {
      Id: 1,
      Name: "Galaxy S24 Ultra",
      Price: 129999,
      OriginalPrice: 134999,
      Colors: 7,
      Badge: "New",
      ImageUrl: "https://images.unsplash.com/photo-1707166138612-4ebbc7ebf779?q=80&w=600&auto=format&fit=crop" // Using Unsplash placeholder for now
    },
    {
      Id: 2,
      Name: "Galaxy Z Fold5",
      Price: 154999,
      Colors: 3,
      Badge: "Best Seller",
      ImageUrl: "https://images.unsplash.com/photo-1691152011702-86872714c30c?q=80&w=600&auto=format&fit=crop"
    },
    {
      Id: 5,
      Name: "Galaxy S23 FE",
      Price: 59999,
      OriginalPrice: 79999,
      Colors: 4,
      Badge: "Save ₹20000",
      ImageUrl: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=600&auto=format&fit=crop"
    },
    {
      Id: 6,
      Name: "Galaxy A54 5G",
      Price: 38999,
      Colors: 2,
      ImageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full pt-8">
      {/* Page Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Mobile</h1>
        <p className="text-gray-500 text-lg">Discover the latest Galaxy smartphones.</p>
      </div>

      {/* Reuse our awesome ProductGrid */}
      <ProductGrid Products={MobileProducts} />
    </div>
  );
};

export default Mobile;