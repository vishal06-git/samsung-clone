import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const Checkout = () => {
  const { CartItems, ClearCart } = useCart();
  const navigate = useNavigate();

  // States for Form, Processing, and Success
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Total Calculations (Same as Cart)
  const subtotal = CartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18;
  const shipping = subtotal > 50000 ? 0 : 500;
  const grandTotal = subtotal + tax + shipping;

  // Protect Checkout Route (Agar cart khali hai toh home bhej do)
  useEffect(() => {
    if (CartItems.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [CartItems, navigate, orderSuccess]);

  // Handle Order Submit
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Fake API Delay (2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      setOrderId('SAM' + Math.floor(Math.random() * 9000000 + 1000000)); // Generate Random Order ID
      ClearCart(); // Cart empty kar do
      window.scrollTo(0, 0);
    }, 2000);
  };

  // ==========================================
  // SUCCESS SCREEN UI
  // ==========================================
  if (orderSuccess) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white pt-32 pb-16 flex flex-col items-center justify-center transition-colors duration-300 px-4 text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-black mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Thank you for shopping at Samsung India.</p>
        <p className="font-bold text-xl mb-8">Order ID: <span className="text-blue-500">{orderId}</span></p>
        
        <div className="flex gap-4">
          <Link to="/" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // CHECKOUT FORM UI
  // ==========================================
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COL: FORMS */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            
            {/* 1. Shipping Details */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6" /> Shipping Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 dark:bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 dark:bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="tel" placeholder="Phone Number" className="w-full bg-gray-50 dark:bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="Pincode" className="w-full bg-gray-50 dark:bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="Full Address (House No, Street)" className="w-full md:col-span-2 bg-gray-50 dark:bg-[#2a2a2a] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" /> Payment Method
              </h2>
              
              <div className="flex flex-col gap-3">
                {/* UPI Option */}
                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 accent-blue-500" />
                  <Smartphone className="w-6 h-6 text-blue-500" />
                  <span className="font-bold text-lg">UPI (GPay, PhonePe, Paytm)</span>
                </label>

                {/* Card Option */}
                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-blue-500" />
                  <CreditCard className="w-6 h-6 text-blue-500" />
                  <span className="font-bold text-lg">Credit / Debit Card</span>
                </label>

                {/* COD Option */}
                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border-2 transition-all ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 accent-blue-500" />
                  <Truck className="w-6 h-6 text-blue-500" />
                  <span className="font-bold text-lg">Cash on Delivery</span>
                </label>
              </div>

              {/* Fake Card Input Form - Only shows if Card is selected */}
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl grid grid-cols-2 gap-4 animate-fade-in-up">
                  <input required type="text" placeholder="Card Number" maxLength="16" className="w-full col-span-2 bg-white dark:bg-[#1a1a1a] px-4 py-3 rounded-lg outline-none border border-gray-200 dark:border-gray-700" />
                  <input required type="text" placeholder="MM/YY" maxLength="5" className="w-full bg-white dark:bg-[#1a1a1a] px-4 py-3 rounded-lg outline-none border border-gray-200 dark:border-gray-700" />
                  <input required type="password" placeholder="CVV" maxLength="3" className="w-full bg-white dark:bg-[#1a1a1a] px-4 py-3 rounded-lg outline-none border border-gray-200 dark:border-gray-700" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COL: FINAL SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-28">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Order Items ({CartItems.length})</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar">
                {CartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-[#f4f4f4] dark:bg-black rounded-lg p-2 flex-shrink-0">
                      <img src={item.ImageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} | {item.selectedColor}</p>
                    </div>
                    <span className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                <span className="text-lg font-bold">Total to Pay</span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl flex items-center justify-center gap-2 disabled:bg-blue-400"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  `Pay ₹${grandTotal.toLocaleString('en-IN')}`
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 100% Secure Payment 
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;