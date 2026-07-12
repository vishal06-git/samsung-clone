import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import { useAuth } from '../../../Context/AuthContext';

const Navbar = () => {
  const { CartItems } = useCart();
  const { User: CurrentUser } = useAuth(); 
  
  // State to control mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Calculate total items in cart
  const TotalItems = CartItems.reduce((total, item) => total + item.Quantity, 0);

  // Helper function to close menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP & MOBILE HEADER BAR               */}
      {/* ========================================= */}
      <nav className="fixed top-0 left-0 w-full bg-white text-black z-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-1">
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="text-2xl font-black tracking-tighter uppercase mb-1">
                Samsung
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[13px] font-bold">
              <Link to="/" className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">Shop</Link>
              <Link to="/mobile" className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">Mobile</Link>
              <Link to="/tv" className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">TV & Audio</Link>
              <Link to="/appliances" className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">Appliances</Link>
              <Link to="/computing" className="hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">Computing</Link>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/search" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
              </Link>
              
              {/* Cart Icon with Dynamic Badge */}
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {TotalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {TotalItems}
                  </span>
                )}
              </Link>
              
              {/* User Login/Greeting */}
              {CurrentUser ? (
                <span className="hidden md:block font-bold text-sm px-2 text-blue-600">
                  Hi, {CurrentUser.Name}
                </span>
              ) : (
                <Link to="/login" className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* ========================================= */}
      {/* MOBILE SLIDING MENU SECTION               */}
      {/* ========================================= */}

      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMenu}
      ></div>

      {/* Sliding Panel */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
           <span className="text-xl font-black tracking-tighter uppercase">Menu</span>
           <button onClick={closeMenu} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col overflow-y-auto py-2">
          <Link to="/" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 hover:bg-gray-50 transition-colors">Shop</Link>
          <Link to="/mobile" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 hover:bg-gray-50 transition-colors">Mobile</Link>
          <Link to="/tv" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 hover:bg-gray-50 transition-colors">TV & Audio</Link>
          <Link to="/appliances" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 hover:bg-gray-50 transition-colors">Appliances</Link>
          <Link to="/computing" onClick={closeMenu} className="px-6 py-4 text-lg font-bold hover:bg-gray-50 transition-colors">Computing</Link>
        </div>
        
        {/* Mobile Footer/Login */}
        <div className="mt-auto p-6 bg-gray-50 border-t border-gray-200">
            {CurrentUser ? (
               <p className="text-sm font-bold text-center mb-4 text-blue-600">Welcome, {CurrentUser.Name}</p>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">Log in to your Samsung Account to access exclusive offers and track orders.</p>
                <Link to="/login" onClick={closeMenu} className="block text-center w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors">
                  Log In / Sign Up
                </Link>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Navbar;