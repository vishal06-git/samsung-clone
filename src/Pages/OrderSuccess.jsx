import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    // NAYA: Navbar overlap fix (pt-24), min-h-screen, aur Dark Mode classes
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
      
      {/* NAYA: Animated Success Icon with soft background circle */}
      <div className="w-24 h-24 md:w-28 md:h-28 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8 animate-fade-in-up shadow-sm border border-green-100 dark:border-green-900/30">
        <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-500 dark:text-green-400" />
      </div>

      {/* Typography Upgrade */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Order Confirmed!
      </h1>
      
      <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-lg font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Thank you for your purchase. We're getting your Galaxy devices ready for shipment.
      </p>
      
      {/* NAYA: Order ID ko ek premium Highlighted Box me daala hai */}
      <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 px-8 py-5 rounded-3xl mb-12 animate-fade-in-up shadow-inner" style={{ animationDelay: '0.3s' }}>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">
          Your Order ID
        </p>
        <p className="text-2xl md:text-3xl font-black font-mono tracking-wider text-blue-600 dark:text-blue-400">
          {orderId}
        </p>
      </div>
      
      {/* NAYA: Buttons with hover animations and hollow/solid combo */}
      <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <Link 
          to="/track" 
          className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          Track Order
        </Link>
        <Link 
          to="/" 
          className="bg-transparent border-2 border-black dark:border-white text-black dark:text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
      
    </div>
  );
};

export default OrderSuccess;