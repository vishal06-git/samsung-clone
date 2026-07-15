import React from 'react';
import ProductGrid from '../Components/Products/ProductGrid';

const Category = ({ title }) => {
  
  // 1. Asli Premium Data: Har category ke alag-alag real-looking products
  const allProducts = [
    // --- MOBILES ---
    { Id: 1, Name: "Galaxy S26 Ultra", Price: 129999, Category: "Mobile", Colors: 4, Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, Category: "Mobile", Colors: 3, ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Z Flip5", Price: 99999, Category: "Mobile", Colors: 4, ImageUrl: "https://images.unsplash.com/photo-1694254881069-b51e0dafcda1?q=80&w=800&auto=format&fit=crop" },
    
    // --- TV & AUDIO ---
    { Id: 101, Name: "Neo QLED 8K Smart TV", Price: 349990, Category: "TV & Audio", Badge: "Best Seller", ImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
    { Id: 102, Name: "The Frame QLED 4K TV", Price: 89990, Category: "TV & Audio", Colors: 1, ImageUrl: "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, Category: "TV & Audio", Colors: 3, ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" },

    // --- APPLIANCES ---
    { Id: 201, Name: "Bespoke Refrigerator", Price: 74990, Category: "Appliances", Colors: 5, ImageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop" },
    { Id: 202, Name: "Front Load Washer", Price: 42990, Category: "Appliances", Colors: 2, ImageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop" },

    // --- COMPUTING ---
    { Id: 301, Name: "Galaxy Book4 Pro", Price: 134990, Category: "Computing", Colors: 2, Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop" },
    { Id: 302, Name: "32\" Smart Monitor M8", Price: 45999, Category: "Computing", Colors: 4, ImageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop" }
  ];

  // 2. Yahan logic check karega ki Navbar se konsi category aayi hai aur sirf wahi data pass karega
  const displayProducts = title === "Shop All" 
    ? allProducts 
    : allProducts.filter(product => product.Category === title);

  return (
    // NAYA: pt-24 (Navbar overlapping fix) aur Dark mode colors
    <div className="w-full pt-28 pb-12 min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
      
      {/* Premium Category Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight capitalize animate-fade-in-up">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Explore the latest in {title.toLowerCase()}.
        </p>
      </div>

      {/* 3. Hamara naya Premium ProductGrid Call kiya */}
      <ProductGrid Products={displayProducts} />
      
    </div>
  );
};

export default Category;