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
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-center">Track Your Order</h1>
        
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-12">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g., SAM123456)" 
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-full px-6 py-4 focus:outline-none focus:border-black text-lg"
            required
          />
          <button type="submit" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Track
          </button>
        </form>

        {error && <p className="text-red-500 text-center font-bold mb-8">{error}</p>}

        {orderData && (
          <div className="bg-[#f4f4f4] rounded-3xl p-6 md:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-gray-300 pb-6 gap-4">
              <div>
                <h3 className="text-2xl font-black text-black">Order: {orderData.orderId}</h3>
                <p className="text-gray-500 mt-1">Placed on {orderData.date}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-black text-black">₹{orderData.total.toLocaleString('en-IN')}</p>
                <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-2">
                  {orderData.status}
                </span>
              </div>
            </div>

            {/* Progress Stepper UI */}
            <div className="relative mb-12 px-4">
              <div className="absolute top-6 left-0 w-full h-1 bg-gray-300 -z-10"></div>
              <div className="flex justify-between">
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] px-2">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                    <Package className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-black">Processing</span>
                </div>
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] px-2 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Shipped</span>
                </div>
                <div className="flex flex-col items-center gap-3 bg-[#f4f4f4] px-2 opacity-40">
                  <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Delivered</span>
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2">Items Details</h4>
              <div className="flex flex-col gap-4">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                    <div className="w-20 h-20 bg-[#f4f4f4] rounded-xl p-2 flex items-center justify-center">
                      <img src={item.ImageUrl} alt={item.Name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-black">{item.Name}</p>
                      <p className="text-sm text-gray-500">Qty: 1</p>
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