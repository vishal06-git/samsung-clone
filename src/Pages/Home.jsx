import React from 'react';
import HeroBanner from '../Components/Ui/HeroBanner';
import ProductSlider from '../Components/Products/ProductSlider'; // Naya Slider Import Kiya

const Home = () => {
  // Expanded product list (6 items total)
  const MockProducts = [
    {
      Id: 1,
      Name: "Galaxy S24 Ultra",
      Price: 129999,
      OriginalPrice: 134999,
      Colors: 3,
      Badge: "New",
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Galaxy+S24+Ultra"
    },
    {
      Id: 2,
      Name: "Galaxy Z Fold5",
      Price: 154999,
      Colors: 3,
      Badge: "Best Seller",
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Galaxy+Z+Fold5"
    },
    {
      Id: 3,
      Name: "Galaxy Watch6 Classic",
      Price: 36999,
      OriginalPrice: 42999,
      Colors: 2,
      Badge: "Save ₹6000",
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Watch6+Classic"
    },
    {
      Id: 4,
      Name: "Galaxy Buds2 Pro",
      Price: 15999,
      Colors: 3,
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Buds2+Pro"
    },
    {
      Id: 5,
      Name: "Galaxy Book3 Pro",
      Price: 114999,
      OriginalPrice: 139999,
      Colors: 2,
      Badge: "Student Offer",
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Galaxy+Book3+Pro"
    },
    {
      Id: 6,
      Name: "Galaxy Tab S9 Ultra",
      Price: 119999,
      Colors: 2,
      ImageUrl: "https://dummyimage.com/600x600/ffffff/000000&text=Tab+S9+Ultra"
    }
  ];

  return (
    <div className="w-full">
      <HeroBanner />
      
      {/* Purane ProductGrid ki jagah naya ProductSlider lagaya */}
      <ProductSlider Title="Recommended for You" Products={MockProducts} />
    </div>
  );
};

export default Home;