import React from 'react';
// 1. Yahan apni video ka EXACT naam likhna jo tumne assets folder me save ki hai
import HeroVideo from '../../assets/s26.WEBM'; 

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-[#f4f4f4] overflow-hidden flex items-center justify-center">
      
      {/* Background Video Section */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
         {/* 2. img ki jagah video tag use kiya hai */}
         <video 
            src={HeroVideo}
            autoPlay
            
            muted 
            playsInline
            className="w-full h-full object-cover"
         />
         
         {/* Optional: Agar tumhari video dark hai, toh ye black overlay text ko padhne me madad karega */}
         {/* <div className="absolute inset-0 bg-black/20 z-10"></div> */}
      </div>

      {/* UPDATE: Text Content (z-20 kiya taaki video ke upar dikhe) */}
      {/* Changes: md:text-left -> md:text-right | md:left-[10%] -> md:right-[10%] | md:items-start -> md:items-end */}
      <div className="relative z-20 text-center px-4 mt-[-100px] md:mt-0 md:text-right md:absolute md:right-[10%] lg:right-[5%] flex flex-col items-center md:items-end">
        
        {/* Agar video dark hai, toh 'text-black' ko 'text-white' kar dena */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 tracking-tighter drop-shadow-md">
          Galaxy S26 Ultra
        </h1>
        <p className="text-lg text-black mb-8 max-w-sm font-medium drop-shadow-md">
          The next era of Galaxy is here. Experience the ultimate power, advanced AI, and the most immersive display yet.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg">
            Buy Now
          </button>
          <button className="bg-white/80 backdrop-blur-sm border border-black text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-colors shadow-lg">
            Learn More
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroBanner;