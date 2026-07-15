import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// NAYA: Apna premium ProductGrid yahan import kar liya
import ProductGrid from '../Components/Products/ProductGrid'; 

// Apni saari 8 downloaded videos yahan import ki hain
import video1 from '../../src/assets/s26.webm';
import video2 from '../../src/assets/s26-2.webm';
import video3 from '../../src/assets/s26-3.webm';
import video4 from '../../src/assets/s26-4.webm';
import video5 from '../../src/assets/s26-5.webm';
import video6 from '../../src/assets/s26-6.webm';
import video7 from '../../src/assets/s26-7.webm';
import video8 from '../../src/assets/s26-8.webm';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Slider ka Database
  const HeroSlides = [
    {
      id: 1,
      videoSrc: video1,
      title: "Galaxy S26 Ultra",
      subtitle: "Galaxy AI is here.",
      buttonText: "Buy Now",
      link: "/product/1"
    },
    {
      id: 2,
      videoSrc: video7, 
      title: "Super Steady Video",
      subtitle: "Even on the go.",
      buttonText: "Learn More",
      link: "/product/2"
    },
    {
      id: 3,
      videoSrc: video8, 
      // Fallback add kiya taaki blank na rahe
      // title: "Play longer",
      // subtitle: "Stay cooler.",
      // buttonText: "Explore",
      // link: "/shop"
    },
    {
      id: 4,
      videoSrc: video2, 
      title: "Design",
      subtitle: "MEET YOUR NEW AI PHONE.",
      buttonText: "Learn More",
      link: "/product/2"
    },
    {
      id: 5,
      videoSrc: video6, 
      title: "Play longer",
      subtitle: "Stay cooler.",
      buttonText: "Learn More",
      link: "/product/2"
    },
    {
      id: 6,
      videoSrc: video3, 
      title: "Performance",
      subtitle: "Galaxy Ecosystem.",
      buttonText: "Explore",
      link: "/shop"
    },
    {
      id: 7,
      videoSrc: video4, 
      title: "Nightography Video",
      subtitle: "Connected living.",
      buttonText: "Explore",
      link: "/shop"
    },
    {
      id: 8,
      videoSrc: video5, 
      title: "Photo Assist",
      subtitle: "Connected living.",
      buttonText: "Explore",
      link: "/shop"
    }
  ];

  // Wahi perfect Unsplash images wala product database
  const FeaturedProducts = [
    { Id: 1, Name: "Galaxy S26 Ultra", Price: 129999, Category: "Mobile", Badge: "New", ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, Category: "Wearable", ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, Category: "Audio", Badge: "Sale", ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" }
  ];

  const handleVideoEnd = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % HeroSlides.length);
  };

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
      
      {/* ======================================= */}
      {/* ADVANCED MULTI-VIDEO HERO SLIDER        */}
      {/* ======================================= */}
      {/* NAYA: mt-[76px] lagaya taaki navbar video ko hide na kare */}
      <section className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center md:justify-end overflow-hidden px-6 md:px-24 mt-[76px]">
        
        {/* Background Video */}
        {/* NAYA: src directly video tag pe lagaya React mounting errors se bachne ke liye */}
        <video 
          key={currentSlide} 
          src={HeroSlides[currentSlide].videoSrc}
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 dark:opacity-80 transition-opacity duration-1000"
        />

        {/* NAYA: Premium Gradient Overlay (Left to Right) */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 md:from-transparent via-black/20 to-black/70 z-10 transition-colors duration-500"></div>

        {/* Hero Content (Center on mobile, Right Aligned on Desktop) */}
        <div className="relative z-20 flex flex-col items-center md:items-end text-center md:text-right w-full md:max-w-2xl mt-auto pb-20 md:pb-0 md:mt-10">
          
          {HeroSlides[currentSlide].title && (
            <h1 key={`title-${currentSlide}`} className="text-4xl md:text-2xl lg:text-4xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl animate-fade-in-up">
              {HeroSlides[currentSlide].title}
            </h1>
          )}
          
          {HeroSlides[currentSlide].subtitle && (
            <p key={`subtitle-${currentSlide}`} className="text-lg md:text-2xl mb-8 md:mb-2 font-medium text-gray-200 drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {HeroSlides[currentSlide].subtitle}
            </p>
          )}
          
          {HeroSlides[currentSlide].buttonText && (
            <Link 
              key={`btn-${currentSlide}`}
              to={HeroSlides[currentSlide].link || "/shop"} 
              className="inline-block bg-white text-black px-8 py-2 rounded-full font-bold text-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-2xl animate-fade-in-up"
              style={{animationDelay: '0.2s'}}
            >
              {HeroSlides[currentSlide].buttonText}
            </Link>
          )}
        </div>
      </section>

      {/* ======================================= */}
      {/* Slide Indicators Video ke Bahar         */}
      {/* ======================================= */}
      <div className="w-full flex justify-center gap-3 py-10 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
        {HeroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'w-12 bg-black dark:bg-white' 
                : 'w-3 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ======================================= */}
      {/* FEATURED PRODUCTS SECTION               */}
      {/* ======================================= */}
      {/* NAYA: Apna reusable ProductGrid use kiya! Code ekdum chota aur clean ho gaya. */}
      <div className="pb-16">
        <ProductGrid Title="Featured Products" Products={FeaturedProducts} />
      </div>

    </div>
  );
};

export default Home;