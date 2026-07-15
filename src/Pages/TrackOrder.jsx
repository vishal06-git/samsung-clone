import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';

const TrackOrder = () => {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    const foundOrder = existingOrders.find(o => o.orderId === orderIdInput.toUpperCase());
    
    if (foundOrder) {
      setOrderData(foundOrder);
      setError('');
    } else {
      setOrderData(null);
      setError('Order not found. Please check your Order ID.');
    }
  };

  return (
    // NAYA: pt-28 for Navbar spacing aur Dark Mode wrappers
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        <h1 className="text-4xl md:text-5xl font-black mb-10 text-center tracking-tight animate-fade-in-up">
          Track Your Order
        </h1>
        
        {/* NAYA: Premium Input Form with Focus Rings */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g., SAM123456)" 
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="flex-grow bg-transparent border-2 border-gray-200 dark:border-gray-800 rounded-full px-8 py-4 focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-lg font-bold placeholder-gray-400 dark:placeholder-gray-600 tracking-wider uppercase"
            required
          />
          <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 shadow-lg flex-shrink-0">
            <Search className="w-5 h-5" /> Track
          </button>
        </form>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl text-center font-bold mb-8 animate-fade-in">
            {error}
          </div>
        )}

        {orderData && (
          // NAYA: Dark Mode compatible Result Card
          <div className="bg-[#f4f4f4] dark:bg-[#151515] rounded-[2rem] p-6 md:p-10 shadow-sm border border-transparent dark:border-gray-800 animate-fade-in-up">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-gray-200 dark:border-gray-800 pb-8 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1">Order Details</p>
                <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white tracking-wider">{orderData.orderId}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Placed on {orderData.date}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-1">Total Amount</p>
                <p className="text-2xl md:text-3xl font-black text-black dark:text-white">₹{orderData.total.toLocaleString('en-IN')}</p>
                <span className="inline-block bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mt-3 shadow-sm">
                  {orderData.status}
                </span>
              </div>
            </div>

            {/* Progress Stepper UI */}
            {/* NAYA: Dark mode background matched with the card background */}
            <div className="relative mb-14 px-2 md:px-8">
              <div className="absolute top-6 left-0 w-full h-1 bg-gray-300 dark:bg-gray-700 -z-10 rounded-full"></div>
              <div className="flex justify-between">
                
                {/* Step 1: Processing */}
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] dark:bg-[#151515] px-2 md:px-4">
                  <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg transform scale-110">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-black dark:text-white">Processing</span>
                </div>
                
                {/* Step 2: Shipped */}
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] dark:bg-[#151515] px-2 md:px-4 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600 text-white flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm dark:text-gray-300">Shipped</span>
                </div>
                
                {/* Step 3: Delivered */}
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] dark:bg-[#151515] px-2 md:px-4 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600 text-white flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm dark:text-gray-300">Delivered</span>
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-gray-800 dark:text-gray-200 uppercase tracking-widest">Items in this Order</h4>
              <div className="flex flex-col gap-4">
                {orderData.items.map((item, idx) => (
                  // NAYA: Premium dark mode item card
                  <div key={idx} className="flex items-center gap-5 bg-white dark:bg-[#1a1a1a] p-4 rounded-3xl shadow-sm border border-transparent dark:border-gray-800 transition-colors">
                    <div className="w-20 h-20 bg-[#f4f4f4] dark:bg-[#222] rounded-2xl p-2 flex items-center justify-center flex-shrink-0">
                      <img src={item.ImageUrl || item.images?.[0]} alt={item.Name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white text-lg line-clamp-1">{item.Name}</p>
                      {/* NAYA: Dynamic Quantity aur Color uthaya */}
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                        Qty: {item.Quantity || 1} <span className="mx-2">|</span> {item.selectedColor || 'Standard'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;