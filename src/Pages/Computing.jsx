import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../Components/Products/ProductGrid';

const Computing = () => {
  const ComputingProducts = [
    { Id: 401, Name: "Galaxy Book4 Ultra (16\", i9)", Price: 299990, Category: "Laptop", Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop" },
    { Id: 402, Name: "49\" Odyssey OLED G9 Monitor", Price: 159990, OriginalPrice: 189990, Category: "Monitor", Badge: "Gaming", ImageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop" },
    { Id: 403, Name: "Galaxy Book4 Pro 360", Price: 179990, Category: "Laptop", ImageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop" },
    { Id: 404, Name: "32\" Smart Monitor M8", Price: 59990, Category: "Monitor", ImageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop" },
    { Id: 405, Name: "2TB 990 PRO NVMe M.2 SSD", Price: 18990, OriginalPrice: 22990, Category: "Storage", Badge: "Sale", ImageUrl: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=800&auto=format&fit=crop" },
    { Id: 406, Name: "Galaxy Book3 (15\", i5)", Price: 74990, Category: "Laptop", ImageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" },
    { Id: 407, Name: "34\" Odyssey G85SB OLED", Price: 119990, Category: "Monitor", Badge: "Gaming", ImageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=800&auto=format&fit=crop" },
    { Id: 408, Name: "27\" ViewFinity S9 High-Res", Price: 129990, Category: "Monitor", ImageUrl: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=800&auto=format&fit=crop" },
    { Id: 409, Name: "Portable SSD T7 Shield 1TB", Price: 9990, Category: "Storage", ImageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop" },
    { Id: 410, Name: "Galaxy Book4 360", Price: 114990, Category: "Laptop", ImageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop" },
    { Id: 411, Name: "27\" Essential Monitor S3", Price: 11990, OriginalPrice: 15990, Category: "Monitor", Badge: "Value", ImageUrl: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=800&auto=format&fit=crop" },
    { Id: 412, Name: "870 EVO SATA 2.5\" 1TB SSD", Price: 7490, Category: "Storage", ImageUrl: "https://images.unsplash.com/photo-1563810166299-4c553d9e8432?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-[76px] min-h-screen">
      
      {/* Computing Hero Banner */}
      <div className="w-full bg-gradient-to-r from-gray-100 to-gray-300 dark:from-[#111] dark:to-[#222] transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-10">
          
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left animate-fade-in-up">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase mb-4 text-sm border border-indigo-600 dark:border-indigo-400 px-4 py-1.5 rounded-full">
              Galaxy Book4 Series
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Unleash your potential.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium mb-10 max-w-md">
              Experience next-level performance with AI-powered processors, Dynamic AMOLED 2X displays, and extreme portability.
            </p>
            <Link to="/product/401" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg">
              Discover Laptops
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop" 
              alt="Galaxy Book Laptop" 
              className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      <div className="pt-16 pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Computing & Storage</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Laptops, Gaming Monitors, and Ultra-fast SSDs.</p>
        </div>
        <ProductGrid Products={ComputingProducts} />
      </div>
    </div>
  );
};

export default Computing;