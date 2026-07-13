import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { CartItems, RemoveFromCart, ClearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = CartItems?.reduce((total, item) => total + item.Price, 0) || 0;
  const shipping = subtotal > 0 ? 0 : 0; 
  const total = subtotal + shipping;

  // CHECKOUT LOGIC
  const handleCheckout = () => {
    // 1. Generate Order ID
    const orderId = "SAM" + Math.floor(Math.random() * 1000000);
    
    // 2. Prepare Order Data
    const orderData = {
      orderId: orderId,
      items: CartItems,
      total: total,
      date: new Date().toLocaleDateString(),
      status: "Processing"
    };

    // 3. Save to LocalStorage (Fake Database)
    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    localStorage.setItem('samsung_orders', JSON.stringify([...existingOrders, orderData]));

    // 4. Clear Cart & Redirect to Success Page
    if(ClearCart) ClearCart();
    navigate(`/success/${orderId}`);
  };

  if (!CartItems || CartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any Galaxy devices to your cart yet.</p>
        <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 min-h-[70vh]">
      <h1 className="text-4xl font-black mb-10">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {CartItems.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-200 rounded-3xl shadow-sm">
              <div className="w-32 h-32 bg-[#f4f4f4] rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
                <img src={item.ImageUrl} alt={item.Name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-black mb-1">{item.Name}</h3>
                <p className="text-sm text-gray-500 mb-2">Color: {item.Colors ? item.Colors[0] : 'Standard'}</p>
                <div className="text-lg font-bold">₹{item.Price.toLocaleString('en-IN')}</div>
              </div>
              <button onClick={() => RemoveFromCart(item.Id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-[#f4f4f4] p-8 rounded-3xl sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-black">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between mb-6 text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="w-full h-px bg-gray-300 mb-6"></div>
            <div className="flex justify-between mb-8 text-xl font-black">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            
            {/* Yahan onClick handleCheckout lagaya hai */}
            <button onClick={handleCheckout} className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 group">
              Place Order
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;