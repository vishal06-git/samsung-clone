import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const { CartItems, RemoveFromCart, UpdateQuantity, ClearCart } = useCart();
  const navigate = useNavigate();

  // NAYA FIX: Subtotal me quantity multiply ki taaki total amount sahi aaye
  const subtotal = CartItems?.reduce((total, item) => total + (item.Price * item.Quantity), 0) || 0;
  const shipping = subtotal > 0 ? 0 : 0; 
  const total = subtotal + shipping;

  const handleCheckout = () => {
    const orderId = "SAM" + Math.floor(Math.random() * 1000000);
    
    const orderData = {
      orderId: orderId,
      items: CartItems,
      total: total,
      date: new Date().toLocaleDateString(),
      status: "Processing"
    };

    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    localStorage.setItem('samsung_orders', JSON.stringify([...existingOrders, orderData]));

    if(ClearCart) ClearCart();
    navigate(`/success/${orderId}`);
  };

  if (!CartItems || CartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
        <div className="w-28 h-28 bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8 shadow-inner">
          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-center max-w-md text-lg">Looks like you haven't added any Galaxy devices to your cart yet.</p>
        <Link to="/" className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Cart Items */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {CartItems.map((item, index) => (
              // NAYA: Dark mode border aur background
              <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-[#151515] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                
                <div className="w-32 h-32 bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-2xl p-3 flex-shrink-0 flex items-center justify-center">
                  <img src={item.ImageUrl || item.images?.[0]} alt={item.Name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                
                <div className="flex-grow flex flex-col items-center sm:items-start w-full text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-1">{item.Name}</h3>
                  {/* NAYA: Sahi color uthaya Context se */}
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    Color: {item.selectedColor || (item.colors ? item.colors[0] : 'Standard')}
                  </p>
                  <div className="text-xl font-bold">₹{item.Price.toLocaleString('en-IN')}</div>
                </div>

                {/* NAYA: Quantity Controls (+ / -) */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center bg-[#f4f4f4] dark:bg-[#1a1a1a] rounded-full p-1">
                    <button 
                      onClick={() => UpdateQuantity(item.Id, item.selectedColor, item.Quantity - 1)}
                      className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                      disabled={item.Quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.Quantity}</span>
                    <button 
                      onClick={() => UpdateQuantity(item.Id, item.selectedColor, item.Quantity + 1)}
                      className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Delete Button */}
                  <button 
                    onClick={() => RemoveFromCart(item.Id, item.selectedColor)} 
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ml-2"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-1/3">
            {/* NAYA: Dark mode sticky box */}
            <div className="bg-[#f4f4f4] dark:bg-[#151515] p-8 rounded-3xl sticky top-28 border border-transparent dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
              
              <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-400">
                <span>Subtotal ({CartItems.reduce((acc, item) => acc + item.Quantity, 0)} items)</span>
                <span className="font-medium text-black dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between mb-6 text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-medium text-green-600 dark:text-green-400">Free</span>
              </div>
              
              <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-6"></div>
              
              <div className="flex justify-between mb-8 text-2xl font-black">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                onClick={handleCheckout} 
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform duration-300 flex justify-center items-center gap-3 group shadow-lg"
              >
                Checkout Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;