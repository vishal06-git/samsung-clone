import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../Components/Products/ProductGrid';

const Mobile = () => {
  // Premium Mobile Data
  const MobileProducts = [
    {
      Id: 1,
      Name: "Galaxy S26 Ultra",
      Price: 129999,
      OriginalPrice: 134999,
      Colors: 7,
      Badge: "New",
      ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" 
    },
    {
      Id: 2,
      Name: "Galaxy Z Fold5",
      Price: 154999,
      Colors: 3,
      Badge: "Best Seller",
      ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop"
    },
    {
      Id: 5,
      Name: "Galaxy S23 FE",
      Price: 59999,
      OriginalPrice: 79999,
      Colors: 4,
      Badge: "Save ₹20000",
      ImageUrl: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=800&auto=format&fit=crop"
    },
    {
      Id: 6,
      Name: "Galaxy A54 5G",
      Price: 38999,
      Colors: 2,
      ImageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    // NAYA: pt-[76px] taaki Navbar ke neeche page na dabe, aur Dark Mode support
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-[76px] min-h-screen">
      
      {/* ======================================= */}
      {/* MOBILE EXCLUSIVE PROMO BANNER           */}
      {/* ======================================= */}
      <div className="w-full bg-[#f4f4f4] dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-8">
          
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-up">
            <span className="text-blue-600 font-bold tracking-widest uppercase mb-4 text-sm">
              Featured Smartphone
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Galaxy AI is here.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium mb-8 max-w-md">
              Unleash new levels of creativity, productivity and possibility with the Galaxy S26 Series.
            </p>
            <Link 
              to="/product/1"
              className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Buy Galaxy S26 Ultra
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" 
              alt="Galaxy S26 Ultra" 
              className="w-[80%] max-w-[400px] h-auto object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>

      {/* ======================================= */}
      {/* ALL MOBILE PRODUCTS GRID                */}
      {/* ======================================= */}
      <div className="pt-8 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">All Mobile Devices</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Discover the latest Galaxy smartphones designed for you.
          </p>
        </div>

        {/* Reuse our awesome ProductGrid */}
        <ProductGrid Products={MobileProducts} />
      </div>

    </div>
  );
};

export default Mobile;