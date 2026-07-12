import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';


const ProductDetail = () => {
  const { id } = useParams();
  const { AddToCart } = useCart();
  const [SelectedColor, setSelectedColor] = useState('Default');

  // Yahan humne database expand kar diya hai taaki TV aur baaki devices bhi mil sakein
  const MockDatabase = [
    {
      Id: 1,
      Name: "Galaxy S24 Ultra",
      Price: 129999,
      OriginalPrice: 134999,
      Colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
      ImageUrl: '../../public/'
    },
    {
      Id: 2,
      Name: "Galaxy Z Fold5",
      Price: 154999,
      Colors: ["Phantom Black", "Cream"],
      ImageUrl: "https://dummyimage.com/400x400/f4f4f4/000000&text=Galaxy+Z+Fold5"
    },
    {
      Id: 3,
      Name: "Galaxy Watch6 Classic",
      Price: 36999,
      Colors: ["Black", "Silver"],
      ImageUrl: "https://dummyimage.com/400x400/f4f4f4/000000&text=Watch6+Classic"
    },
    {
      Id: 4,
      Name: "Galaxy Buds2 Pro",
      Price: 15999,
      Colors: ["Graphite", "White"],
      ImageUrl: "https://dummyimage.com/400x400/f4f4f4/000000&text=Buds2+Pro"
    },
    // Yeh rahe tumhare Category pages ke Dummy Products
    {
      Id: 101,
      Name: "Premium Smart TV (Device 1)",
      Price: 49999,
      Colors: ["Black"],
      ImageUrl: "https://images.samsung.com/is/image/samsung/assets/in/microsite/in_corporate/22072_Seo_Monitor_370x160-Copy.jpg?$370_160_JPG"
    },
    {
      Id: 102,
      Name: "Ultra HD Soundbar (Device 2)",
      Price: 89999,
      Colors: ["Black", "Silver"],
      ImageUrl: "https://images.samsung.com/is/image/samsung/assets/in/microsite/in_corporate/22072_Seo_TV_370x160-Copy.jpg?$370_160_JPG$"
    }
  ];

  // URL id se product dhundho
  const Product = MockDatabase.find((item) => item.Id === parseInt(id));

  // Agar product sach me nahi hai, tabhi ye error dikhega
  if (!Product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-500 mb-8">The device you are looking for does not exist in our mock database.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Product Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#f4f4f4] rounded-3xl p-12 flex items-center justify-center min-h-[500px]">
          <img 
            src={Product.ImageUrl} 
            alt={Product.Name} 
            className="w-full max-w-md h-auto object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Right Side: Product Info & Actions */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            {Product.Name}
          </h1>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-2xl font-bold">₹{Product.Price.toLocaleString('en-IN')}</span>
            {Product.OriginalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{Product.OriginalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">
              Color: <span className="text-gray-500 font-normal">{SelectedColor !== 'Default' ? SelectedColor : Product.Colors[0]}</span>
            </h3>
            <div className="flex gap-4">
              {Product.Colors.map((color, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    (SelectedColor === color || (SelectedColor === 'Default' && index === 0)) ? 'border-black p-1' : 'border-transparent'
                  }`}
                  title={color}
                >
                  <div className="w-full h-full rounded-full bg-gray-800"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => AddToCart(Product)}
            className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>

          {/* Marketing text */}
          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            Get up to ₹12000 instant discount with HDFC bank cards. Standard EMI starts at ₹5416/mo. 
            T&C apply.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;