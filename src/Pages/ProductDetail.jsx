import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import ReviewSection from '../Components/Ui/ReviewSection';

const ProductDetail = () => {
  const { id } = useParams();
  const { AddToCart } = useCart();
  const [SelectedColor, setSelectedColor] = useState('Default');

  // NAYA: Unsplash ki high-quality images ke sath full database
  const MockDatabase = [
    { Id: 1, Name: "Galaxy S24 Ultra", Price: 129999, OriginalPrice: 134999, Colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"], ImageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    { Id: 2, Name: "Galaxy Z Fold5", Price: 154999, OriginalPrice: 164999, Colors: ["Phantom Black", "Cream"], ImageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=800&auto=format&fit=crop" },
    { Id: 3, Name: "Galaxy Watch6 Classic", Price: 36999, OriginalPrice: 39999, Colors: ["Black", "Silver"], ImageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop" },
    { Id: 4, Name: "Galaxy Buds2 Pro", Price: 15999, OriginalPrice: 17999, Colors: ["Graphite", "White"], ImageUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop" },
    { Id: 5, Name: "Galaxy Book3 Pro", Price: 114999, OriginalPrice: 124999, Colors: ["Graphite", "Beige"], ImageUrl: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?q=80&w=800&auto=format&fit=crop" },
    { Id: 6, Name: "Galaxy Tab S9 Ultra", Price: 119999, OriginalPrice: 129999, Colors: ["Graphite", "Beige"], ImageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop" },
    { Id: 101, Name: "Premium Smart TV", Price: 49999, OriginalPrice: 55999, Colors: ["Black"], ImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
    { Id: 102, Name: "Ultra HD Soundbar", Price: 89999, OriginalPrice: 99999, Colors: ["Black", "Silver"], ImageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop" }
  ];

  // FIX: parseInt me base 10 add kar diya aur error se bachne ke liye safe variable banaya
  const safeId = parseInt(id, 10) || 0;

  // Optimistic UI Fallback Logic
  const Product = MockDatabase.find((item) => item.Id === safeId) || {
    Id: safeId,
    Name: "Samsung Premium Device",
    Price: 45999,
    OriginalPrice: 52999,
    Colors: ["Matte Black", "Pearl White"],
    ImageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Product Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-3xl p-12 flex items-center justify-center min-h-[500px] transition-colors duration-300">
          <img 
            src={Product.ImageUrl} 
            alt={Product.Name} 
            className="w-full max-w-md h-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-xl rounded-xl"
          />
        </div>

        {/* Right Side: Product Info & Actions */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
            {Product.Name}
          </h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-bold text-black dark:text-white">₹{Product.Price.toLocaleString('en-IN')}</span>
            {Product.OriginalPrice && (
              <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                ₹{Product.OriginalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-black dark:text-white">
              Color: <span className="text-gray-500 dark:text-gray-400 font-normal">{SelectedColor !== 'Default' ? SelectedColor : Product.Colors[0]}</span>
            </h3>
            <div className="flex gap-4">
              {Product.Colors.map((color, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    (SelectedColor === color || (SelectedColor === 'Default' && index === 0)) ? 'border-black dark:border-white p-1' : 'border-transparent'
                  }`}
                  title={color}
                >
                  <div className={`w-full h-full rounded-full ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-200 border border-gray-300'}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => AddToCart(Product)}
            className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Add to Cart
          </button>

          {/* Marketing text */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Get up to ₹12000 instant discount with HDFC bank cards. Standard EMI starts at ₹5416/mo. 
            T&C apply.
          </p>
        </div>

      </div>
      
      {/* Review Section Render */}
      <ReviewSection />
      
    </div>
  );
};

export default ProductDetail;