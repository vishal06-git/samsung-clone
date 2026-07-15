import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../Components/Products/ProductGrid';

const Appliances = () => {
  // Premium Samsung Appliances Data
  const ApplianceProducts = [
    {
      Id: 201,
      Name: "Bespoke French Door Refrigerator",
      Price: 145990,
      OriginalPrice: 160990,
      Category: "Appliances",
      Colors: 5,
      Badge: "Customizable",
      ImageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop" 
    },
    {
      Id: 202,
      Name: "Front Load AI Ecobubble™ Washer",
      Price: 54990,
      OriginalPrice: 65990,
      Category: "Appliances",
      Colors: 2,
      Badge: "Best Seller",
      ImageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop"
    },
    {
      Id: 203,
      Name: "WindFree™ Split Air Conditioner",
      Price: 42990,
      Category: "Appliances",
      Colors: 1,
      Badge: "Energy Saving",
      ImageUrl: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=800&auto=format&fit=crop"
    },
    {
      Id: 204,
      Name: "Bespoke Jet™ Stick Vacuum",
      Price: 64990,
      Category: "Appliances",
      Colors: 3,
      ImageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-[76px] min-h-screen">
      
      {/* ======================================= */}
      {/* BESPOKE HOME EXCLUSIVE PROMO BANNER     */}
      {/* ======================================= */}
      <div className="w-full bg-[#e8f0f2] dark:bg-[#121a1f] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-20 gap-8">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-up">
            <span className="text-teal-600 dark:text-teal-400 font-bold tracking-widest uppercase mb-4 text-sm">
              Bespoke Home
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Designed for you, by you.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium mb-8 max-w-md">
              Upgrade your home with customizable designs and intelligent features that fit your unique lifestyle.
            </p>
            <Link 
              to="/product/201"
              className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Explore Bespoke
            </Link>
          </div>

          {/* Banner Image */}
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop" 
              alt="Bespoke Refrigerator" 
              className="w-[85%] max-w-[450px] h-auto object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-500 rounded-3xl"
            />
          </div>

        </div>
      </div>

      {/* ======================================= */}
      {/* ALL APPLIANCES GRID                     */}
      {/* ======================================= */}
      <div className="pt-16 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-10 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Home Appliances</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Smart innovations to make your everyday life easier and better.
          </p>
        </div>

        {/* Humara premium grid component */}
        <ProductGrid Products={ApplianceProducts} />
      </div>

    </div>
  );
};

export default Appliances;