import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { CartItems, RemoveFromCart, UpdateQuantity } = useCart();
  
  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Calculations
  const subtotal = CartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST (Fake calculation for UI)
  const shipping = subtotal > 50000 ? 0 : 500; // Free shipping over ₹50,000
  const discountAmount = subtotal * (discount / 100);
  const grandTotal = subtotal + tax + shipping - discountAmount;

  // Promo Code Handler
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAMSUNG20') {
      setDiscount(20);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid Promo Code');
    }
  };

  // ---------------- EMPTY CART UI ----------------
  if (CartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white pt-32 pb-16 flex flex-col items-center justify-center transition-colors duration-300">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 font-medium">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform duration-300">
          Start Shopping
        </Link>
      </div>
    );
  }

  // ---------------- FILLED CART UI ----------------
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDE: CART ITEMS LIST */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {CartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center bg-white dark:bg-[#1a1a1a] p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 gap-6">
                
                {/* Product Image */}
                <Link to={`/product/${item.Id}`} className="w-32 h-32 bg-[#f4f4f4] dark:bg-black rounded-2xl p-4 flex-shrink-0">
                  <img src={item.ImageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </Link>

                {/* Product Info */}
                <div className="flex flex-col flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg md:text-xl line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">Color: <span className="font-medium text-black dark:text-gray-300">{item.selectedColor}</span></p>
                  <p className="font-bold text-xl">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>

                {/* Controls (Quantity & Delete) */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-4 bg-gray-100 dark:bg-[#2a2a2a] rounded-full px-2 py-1">
                    <button onClick={() => UpdateQuantity(item.Id, item.selectedColor, -1)} className="p-2 hover:bg-white dark:hover:bg-black rounded-full transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => UpdateQuantity(item.Id, item.selectedColor, 1)} className="p-2 hover:bg-white dark:hover:bg-black rounded-full transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button onClick={() => RemoveFromCart(item.Id, item.selectedColor)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              {/* Promo Code Box */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Promo Code (Try SAMSUNG20)" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-gray-100 dark:bg-[#2a2a2a] text-black dark:text-white px-10 py-3 rounded-full text-sm font-medium outline-none border border-transparent focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <button onClick={handleApplyPromo} className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-2 ml-4 font-medium">{promoError}</p>}
                {discount > 0 && <p className="text-green-500 text-xs mt-2 ml-4 font-bold">20% Discount Applied!</p>}
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black dark:text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (18%)</span>
                  <span className="text-black dark:text-white font-bold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-black dark:text-white font-bold">
                    {shipping === 0 ? <span className="text-green-500">Free</span> : `₹${shipping}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount (20%)</span>
                    <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold">Grand Total</span>
                <span className="text-2xl md:text-3xl font-black">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <Link to="/checkout" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 shadow-xl">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;