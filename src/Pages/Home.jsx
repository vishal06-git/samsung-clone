import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Apni saari 6 downloaded videos yahan import ki hain
import video1 from '../../src/assets/s26.WEBM';
import video2 from '../../src/assets/s26-2.WEBM';
import video3 from '../../src/assets/s26-3.WEBM';
import video4 from '../../src/assets/s26-4.WEBM';
import video5 from '../../src/assets/s26-5.WEBM';
import video6 from '../../src/assets/s26-6.WEBM';
import video7 from '../../src/assets/s26-7.WEBM';
import video8 from '../../src/assets/s26-8.WEBM';



const Home = () => {
  // Yeh hai current video/slide track karne ka state
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Hero Slider ka Database (String hata kar direct variables lagaye aur ID theek ki)
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
      // title: "Play longer",
      // subtitle: "Stay cooler.",
      buttonText: "Explore",
      // link: "/product/2"
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
    { Id: 1, Name: "Galaxy S26 Ultra", Price: 129999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, Category: "Mobile", ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, Category: "Wearable", ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, Category: "Audio", ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" }
  ];

  // Ye function video khatam hone par automatic next slide par le jayega
  const handleVideoEnd = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % HeroSlides.length);
  };

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
      
      {/* ======================================= */}
      {/* ADVANCED MULTI-VIDEO HERO SLIDER        */}
      {/* ======================================= */}
      <section className="relative w-full h-[85vh] flex items-center justify-end overflow-hidden px-6 md:px-24">
        
        {/* Background Video */}
        <video 
          key={currentSlide} 
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd} // Jaise hi video khatam hogi, agli chal jayegi
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        >
          {/* NAYA: type="video/webm" bhi laga diya taaki browser ko load karne me aasaani ho */}
          <source src={HeroSlides[currentSlide].videoSrc} type="video/webm" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500"></div>

        {/* Hero Content (Right Aligned) */}
        <div className="relative z-20 flex flex-col items-end text-right w-full md:max-w-2xl mt-10">
          <h1 key={`title-${currentSlide}`} className="text-xl md:text-5xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl animate-fade-in-up">
            {HeroSlides[currentSlide].title}
          </h1>
          <p key={`subtitle-${currentSlide}`} className="text-xl md:text-2xl mb-2 font-medium text-gray-200 drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {HeroSlides[currentSlide].subtitle}
          </p>
          <Link 
            key={`btn-${currentSlide}`}
            to={HeroSlides[currentSlide].link} 
            className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:bg-gray-200 transition-all duration-300 shadow-2xl animate-fade-in-up"
            style={{animationDelay: '0.2s'}}
          >
            {HeroSlides[currentSlide].buttonText}
          </Link>
        </div>
      </section>

      {/* ======================================= */}
      {/* NAYA: Slide Indicators Video ke Bahar  */}
      {/* ======================================= */}
      <div className="w-full flex justify-center gap-3 py-8 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
        {HeroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-10 bg-black dark:bg-white' 
                : 'w-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ======================================= */}
      {/* FEATURED PRODUCTS SECTION               */}
      {/* ======================================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 pb-24 pt-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FeaturedProducts.map((product) => (
            <Link 
              key={product.Id} 
              to={`/product/${product.Id}`}
              className="group flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
            >
              <div className="w-full aspect-square mb-6 overflow-hidden rounded-2xl bg-[#f4f4f4] dark:bg-[#1a1a1a] flex items-center justify-center">
                <img 
                  src={product.ImageUrl} 
                  alt={product.Name} 
                  className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                />
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{product.Category}</p>
              <h3 className="text-xl font-bold mb-2">{product.Name}</h3>
              <p className="text-lg font-medium">₹{product.Price.toLocaleString('en-IN')}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;