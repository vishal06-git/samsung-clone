import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../Components/Products/ProductGrid';

const TvAudio = () => {
  const TvAudioProducts = [
    { Id: 301, Name: "85\" Neo QLED 8K Smart TV", Price: 849990, OriginalPrice: 999990, Category: "TV", Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
    { Id: 302, Name: "77\" OLED 4K Smart TV", Price: 419990, OriginalPrice: 459990, Category: "TV", Badge: "Best Seller", ImageUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop" },
    { Id: 303, Name: "65\" The Frame QLED 4K", Price: 144990, Category: "Lifestyle TV", ImageUrl: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=800&auto=format&fit=crop" },
    { Id: 304, Name: "Q-Series 11.1.4ch Soundbar", Price: 104990, Category: "Audio", Badge: "Dolby Atmos", ImageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop" },
    { Id: 305, Name: "75\" Neo QLED 4K TV", Price: 349990, Category: "TV", ImageUrl: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=800&auto=format&fit=crop" },
    { Id: 306, Name: "The Freestyle Smart Projector", Price: 59990, OriginalPrice: 69990, Category: "Projector", Badge: "Sale", ImageUrl: "https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=800&auto=format&fit=crop" },
    { Id: 307, Name: "55\" The Serif QLED 4K", Price: 89990, Category: "Lifestyle TV", ImageUrl: "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=800&auto=format&fit=crop" },
    { Id: 308, Name: "S-Series Ultra Slim Soundbar", Price: 42990, Category: "Audio", ImageUrl: "https://images.unsplash.com/photo-1611800065449-6cb402b85e05?q=80&w=800&auto=format&fit=crop" },
    { Id: 309, Name: "The Premiere 4K Smart Laser", Price: 399990, Category: "Projector", ImageUrl: "https://images.unsplash.com/photo-1585255474384-5a8b79d23507?q=80&w=800&auto=format&fit=crop" },
    { Id: 310, Name: "65\" Crystal 4K UHD TV", Price: 64990, OriginalPrice: 84990, Category: "TV", Badge: "Value", ImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" },
    { Id: 311, Name: "Sound Tower Party Audio", Price: 29990, Category: "Audio", ImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop" },
    { Id: 312, Name: "43\" The Sero QLED 4K", Price: 94990, Category: "Lifestyle TV", Badge: "Rotating Screen", ImageUrl: "https://images.unsplash.com/photo-1626307416562-ee839676f5fc?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-[76px] min-h-screen">
      
      {/* TV & Audio Hero Banner */}
      <div className="w-full bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1600&auto=format&fit=crop" alt="TV Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10 flex flex-col items-start animate-fade-in-up">
          <span className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm border border-blue-500 px-4 py-1.5 rounded-full">
            Neo QLED 8K
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight max-w-2xl">
            Screen meets perfection.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
            Discover a new era of picture quality. Experience deeper blacks, brilliant colors, and immersive Dolby Atmos audio.
          </p>
          <Link to="/product/301" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl">
            Buy Now
          </Link>
        </div>
      </div>

      <div className="pt-16 pb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 mb-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">TV & Audio Collection</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Turn your living room into a cinematic experience.</p>
        </div>
        <ProductGrid Products={TvAudioProducts} />
      </div>
    </div>
  );
};

export default TvAudio;