import React from 'react';
// Yahan apni video ka EXACT naam likhna jo tumne assets folder me save ki hai
import HeroVideo from '../../assets/s26.WEBM'; 

const HeroBanner = () => {
  return (
    // NAYA: Height badha kar h-[85vh] ki taaki cinematic look aaye. 
    // transition-colors lagaya taaki theme change smooth ho.
    <div className="relative w-full h-[75vh] md:h-[85vh] bg-white dark:bg-[#0f0f0f] overflow-hidden flex items-center justify-center transition-colors duration-300 mt-16 md:mt-[76px]">
      
      {/* Background Video Section */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
         <video 
            src={HeroVideo}
            autoPlay
            loop
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90 dark:opacity-75 transition-opacity duration-500"
         />
         
         {/* NAYA: Premium Gradient Overlay 
             Left-to-Right gradient taaki left side (video) clear rahe aur right side (text) legible rahe. */}
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/60 dark:to-black/80 z-10 transition-colors duration-500"></div>
      </div>

      {/* Text Content (Right aligned for premium ad feel) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center md:items-end text-center md:text-right">
        
        {/* NAYA: Typography upgrade ki hai. Text size aur weight badhaya. */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl animate-fade-in-up">
          Galaxy S26 Ultra
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-lg font-medium drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Galaxy AI is here. Experience the ultimate power and the most immersive display yet.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button className="bg-white text-black px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-2xl">
            Buy Now
          </button>
          <button className="bg-transparent border-2 border-white text-white px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
            Learn More
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroBanner;