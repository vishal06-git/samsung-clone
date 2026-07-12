import React from 'react';
import ProductGrid from '../Components/Products/ProductGrid';

const Category = ({ title }) => {
  // Yeh ek generic data hai jo har category me dikhega jab tak asli data na ho
  const DummyProducts = [
    { Id: 101, Name: `${title} Device 1`, Price: 49999, ImageUrl: "/images/s24-ultra.jpg"},
    { Id: 102, Name: `${title} Device 2`, Price: 89999, ImageUrl: "/images/s24-ultra.jpg" },
  ];

  return (
    <div className="w-full pt-8 min-h-[60vh]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black mb-4">{title}</h1>
        <p className="text-gray-500 text-lg">Explore the latest in {title.toLowerCase()}.</p>
      </div>
      <ProductGrid Products={DummyProducts} />
    </div>
  );
};

export default Category;