import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { CartItems } = useCart();
  const [PaymentMethod, setPaymentMethod] = useState('card');

  const SubTotal = CartItems.reduce((sum, item) => sum + (item.Price * item.Quantity), 0);

  // Prevent accessing checkout if cart is empty
  if (CartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Forms */}
        <div className="w-full lg:w-2/3 flex flex-col gap-10">
          
          {/* Shipping Details */}
          <section>
            <h2 className="text-xl font-bold mb-6 border-b border-gray-200 pb-2">1. Shipping Address</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black" />
              <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black" />
              <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-lg p-3 w-full md:col-span-2 focus:outline-none focus:border-black" />
              <input type="text" placeholder="Street Address" className="border border-gray-300 rounded-lg p-3 w-full md:col-span-2 focus:outline-none focus:border-black" />
              <input type="text" placeholder="City" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black" />
              <input type="text" placeholder="PIN Code" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-black" />
            </form>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-xl font-bold mb-6 border-b border-gray-200 pb-2">2. Payment Method</h2>
            <div className="space-y-4">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${PaymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                <input type="radio" name="payment" value="card" checked={PaymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="mr-3" />
                <span className="font-bold">Credit / Debit Card</span>
              </label>
              
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${PaymentMethod === 'upi' ? 'border-black bg-gray-50' : 'border-gray-300'}`}>
                <input type="radio" name="payment" value="upi" checked={PaymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="mr-3" />
                <span className="font-bold">UPI (GPay, PhonePe, etc.)</span>
              </label>
            </div>
          </section>

        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#f4f4f4] rounded-3xl p-8 sticky top-24">
            <h3 className="text-2xl font-bold mb-6">In Your Cart</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              {CartItems.map((Item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img src={Item.ImageUrl} alt={Item.Name} className="w-12 h-12 object-contain bg-white rounded-md p-1" />
                    <span className="font-medium text-gray-700">{Item.Name} <span className="text-gray-400">x{Item.Quantity}</span></span>
                  </div>
                  <span className="font-bold">₹{(Item.Price * Item.Quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-300 my-6"></div>
            
            <div className="flex justify-between mb-8 text-xl font-bold">
              <span>Total to Pay</span>
              <span>₹{SubTotal.toLocaleString('en-IN')}</span>
            </div>

            <button onClick={() => alert("Order placed successfully! (Mock)")} className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors">
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;