import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { CartItems, ClearCart } = useCart();
  const [PaymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const SubTotal = CartItems.reduce((sum, item) => sum + (item.Price * item.Quantity), 0);

  // REAL CHECKOUT LOGIC
  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Form submit default behavior rokne ke liye
    
    // 1. Generate Order ID
    const orderId = "SAM" + Math.floor(Math.random() * 1000000);
    
    // 2. Prepare Order Data
    const orderData = {
      orderId: orderId,
      items: CartItems,
      total: SubTotal,
      date: new Date().toLocaleDateString(),
      status: "Processing",
      paymentMethod: PaymentMethod
    };

    // 3. Save to LocalStorage (Fake Database)
    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    localStorage.setItem('samsung_orders', JSON.stringify([...existingOrders, orderData]));

    // 4. Success Toast, Clear Cart & Redirect to Success Page
    toast.success("Order placed successfully!");
    if(ClearCart) ClearCart();
    navigate(`/success/${orderId}`);
  };

  // Prevent accessing checkout if cart is empty
  if (CartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
        <h2 className="text-3xl font-extrabold mb-6 tracking-tight">No items to checkout</h2>
        <Link to="/" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Checkout</h1>
        
        {/* NAYA: Form tag lagaya taaki "Enter" dabane par bhi submit ho jaye */}
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Forms */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            
            {/* Shipping Details */}
            <section>
              <h2 className="text-2xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">1. Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NAYA: Premium inputs with dark mode support and focus rings */}
                <input required type="text" placeholder="First Name" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="Last Name" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="email" placeholder="Email Address" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="Street Address" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="City" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                <input required type="text" placeholder="PIN Code" className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-2xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">2. Payment Method</h2>
              <div className="space-y-4">
                
                {/* Credit Card Option */}
                <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${PaymentMethod === 'card' ? 'border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                  <div className="flex items-center">
                    <input type="radio" name="payment" value="card" checked={PaymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 mr-4 accent-black dark:accent-white" />
                    <span className="font-bold text-lg">Credit / Debit Card</span>
                  </div>
                  {PaymentMethod === 'card' && <CheckCircle2 className="w-6 h-6 text-black dark:text-white animate-fade-in" />}
                </label>
                
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${PaymentMethod === 'upi' ? 'border-black dark:border-white bg-gray-50 dark:bg-[#1a1a1a]' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                  <div className="flex items-center">
                    <input type="radio" name="payment" value="upi" checked={PaymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 mr-4 accent-black dark:accent-white" />
                    <span className="font-bold text-lg">UPI (GPay, PhonePe, etc.)</span>
                  </div>
                  {PaymentMethod === 'upi' && <CheckCircle2 className="w-6 h-6 text-black dark:text-white animate-fade-in" />}
                </label>
                
              </div>
            </section>

          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#f4f4f4] dark:bg-[#151515] rounded-3xl p-8 sticky top-28 border border-transparent dark:border-gray-800 shadow-sm">
              <h3 className="text-2xl font-bold mb-8">In Your Cart</h3>
              
              <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {CartItems.map((Item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white dark:bg-[#222] rounded-xl p-2 flex-shrink-0 flex items-center justify-center">
                      <img src={Item.ImageUrl || Item.images?.[0]} alt={Item.Name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm line-clamp-1">{Item.Name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Qty: {Item.Quantity} | {Item.selectedColor || 'Standard'}</p>
                    </div>
                    <span className="font-bold text-sm">₹{(Item.Price * Item.Quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>
              
              <div className="flex justify-between mb-8 text-2xl font-black">
                <span>Total to Pay</span>
                <span>₹{SubTotal.toLocaleString('en-IN')}</span>
              </div>

              {/* NAYA: Type 'submit' kar diya taaki form validation kaam kare */}
              <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform duration-300 shadow-lg">
                Complete Purchase
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;