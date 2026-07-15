import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import ReviewSection from '../Components/Ui/ReviewSection';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { AddToCart } = useCart();
  const { WishlistItems, ToggleWishlist } = useWishlist();
  
  // ==========================================
  // FLAGSHIP PRODUCTS DATABASE
  // ==========================================
  const productsData = {
    // --- MOBILES & WEARABLES ---
    "1": {
      name: "Galaxy S26 Ultra", price: 129999, category: "Mobile",
      description: "Experience the pinnacle of smartphone technology with the Galaxy S26 Ultra. Featuring an aerospace-grade titanium body, the revolutionary new processor, and our most advanced Galaxy AI integration yet.",
      features: ["ProVisual Engine AI", "200MP Quad-Telephoto", "Snapdragon 8 Gen 4", "Titanium Frame"],
      colors: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
      images: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1678911820864-e4c567cd9a37?q=80&w=800&auto=format&fit=crop"
      ]
    },
    "2": {
      name: "Galaxy Z Fold5", price: 154999, category: "Mobile",
      description: "Unfold your world. The Galaxy Z Fold5 features a redesigned Zero-gap Flex Hinge that folds perfectly flat.",
      features: ["7.6\" Dynamic AMOLED 2X", "Zero-gap Flex Hinge", "Snapdragon 8 Gen 2", "Multi-Active Window"],
      colors: ["Icy Blue", "Phantom Black"],
      images: ["https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop"]
    },
    
    // --- APPLIANCES ---
    "201": {
      name: "Bespoke French Door Refrigerator", price: 145990, category: "Appliances",
      description: "Customizable design meets advanced cooling. Choose colors and finishes to match your kitchen perfectly.",
      features: ["Customizable Door Colors", "Twin Cooling Plus™", "FlexZone™ Drawer", "UV Deodorizing Filter"],
      colors: ["Navy Glass", "White Glass", "Matte Black"],
      images: ["https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop"]
    },

    // --- TV & AUDIO ---
    "301": {
      name: "85\" Neo QLED 8K Smart TV", price: 849990, category: "TV",
      description: "Discover a new era of picture quality. Experience deeper blacks, brilliant colors, and immersive Dolby Atmos audio.",
      features: ["Quantum Matrix Technology Pro", "Neural Quantum Processor 8K", "Infinity One Design", "Dolby Atmos"],
      colors: ["Titan Black"],
      images: [
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
      ]
    },

    // --- COMPUTING ---
    "401": {
      name: "Galaxy Book4 Ultra (16\", i9)", price: 299990, category: "Laptop",
      description: "Experience next-level performance with AI-powered processors, Dynamic AMOLED 2X displays, and extreme portability.",
      features: ["Intel Core Ultra 9", "NVIDIA GeForce RTX 4070", "Dynamic AMOLED 2X", "Quad Speakers by AKG"],
      colors: ["Moonstone Gray"],
      images: [
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop"
      ]
    },

    // --- GENERIC FALLBACK ---
    "default": {
      name: "Samsung Galaxy Device", price: 79999, category: "Electronics",
      description: "Experience the next generation of Samsung innovation. Built for the future with premium materials.",
      features: ["Premium Build", "Next-Gen Performance", "Fast Charging", "Knox Security"],
      colors: ["Phantom Black", "Cream"],
      images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop"]
    }
  };

  const currentId = String(id);
  
  // ==========================================
  // SMART DYNAMIC FALLBACK LOGIC
  // ==========================================
  let rawProduct = productsData[currentId];

  // Agar specific ID database mein nahi mili, toh uski ID series ke hisaab se generic data de do
  if (!rawProduct) {
    const idNum = Number(currentId);
    
    if (idNum > 300 && idNum <= 399) {
      // Any unknown TV/Audio product
      rawProduct = {
        name: "Premium Samsung TV & Audio", price: 144990, category: "TV & Audio",
        description: "Transform your living space with our state-of-the-art displays and immersive soundscapes.",
        features: ["4K UHD Resolution", "Quantum HDR", "Smart Hub", "Object Tracking Sound"],
        colors: ["Titan Black"],
        images: ["https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=800&auto=format&fit=crop"]
      };
    } else if (idNum > 400 && idNum <= 499) {
      // Any unknown Computing product
      rawProduct = {
        name: "Samsung Galaxy Computing Device", price: 119990, category: "Computing",
        description: "Work, play, and create with unmatched processing power and crystal-clear displays.",
        features: ["High-speed Processor", "AMOLED Display", "All-day Battery", "Ultra-slim Design"],
        colors: ["Graphite", "Silver"],
        images: ["https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop"]
      };
    } else if (idNum > 200 && idNum <= 299) {
      // Any unknown Appliance
      rawProduct = {
        name: "Smart Samsung Appliance", price: 59990, category: "Appliance",
        description: "Upgrade your home with intelligent features that fit your unique lifestyle.",
        features: ["SmartThings Compatible", "Energy Efficient", "Quiet Operation", "Premium Finish"],
        colors: ["White", "Black"],
        images: ["https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop"]
      };
    } else {
      rawProduct = productsData["default"];
    }
  }
  
  const product = {
    ...rawProduct,
    Id: currentId,
    Name: rawProduct.name,
    Price: rawProduct.price,
    ImageUrl: rawProduct.images[0]
  };

  const [mainImage, setMainImage] = useState(rawProduct.images[0]);
  const [selectedColor, setSelectedColor] = useState(rawProduct.colors[0]);

  const isWishlisted = WishlistItems?.some(item => item.Id === currentId);

  useEffect(() => {
    setMainImage(rawProduct.images[0]);
    setSelectedColor(rawProduct.colors[0]);
    window.scrollTo(0, 0); 
  }, [currentId, rawProduct]);

  const handleAddToCart = () => {
    AddToCart(product, selectedColor);
  };

  const handleBuyNow = () => {
    AddToCart(product, selectedColor);
    navigate('/cart');
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black dark:text-white">{product.name}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="relative w-full aspect-square bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-[2rem] flex items-center justify-center p-8 overflow-hidden group shadow-sm border border-transparent dark:border-gray-800">
              
              <button 
                onClick={() => ToggleWishlist(product)}
                className="absolute top-6 right-6 p-3 bg-white dark:bg-[#2a2a2a] shadow-md hover:shadow-lg rounded-full z-10 hover:scale-110 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Heart 
                  className={`w-6 h-6 transition-colors ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-300 hover:text-red-500'
                  }`} 
                />
              </button>

              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-contain animate-fade-in-up mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {rawProduct.images.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 rounded-2xl p-3 cursor-pointer border-2 transition-all duration-300 flex-shrink-0 ${
                    mainImage === img 
                      ? 'border-black dark:border-white bg-white dark:bg-black shadow-md' 
                      : 'border-transparent bg-[#f4f4f4] dark:bg-[#1a1a1a] hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col mt-4 lg:mt-0">
            <span className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
              {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-medium mb-6">₹{product.price.toLocaleString('en-IN')}</p>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              {rawProduct.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                Color: <span className="text-black dark:text-white ml-1">{selectedColor}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {rawProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                      selectedColor === color 
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md' 
                        : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rawProduct.features.map((feat, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-medium text-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-[#222] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform duration-300 shadow-xl"
              >
                Buy Now
              </button>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-transparent border-2 border-black dark:border-white text-black dark:text-white py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <ReviewSection />

    </div>
  );
};

export default ProductDetail;