import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Sun, Moon } from 'lucide-react'; // 1. Sun aur Moon import kiye
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import { useAuth } from '../../../Context/AuthContext';
import { useWishlist } from '../../../Context/WishlistContext'; 
import { useTheme } from '../../../Context/ThemeContext'; // 2. ThemeContext import kiya
import SearchOverlay from '../../Ui/SearchOverlay';

const Navbar = () => {
  const { CartItems } = useCart();
  const { User: CurrentUser } = useAuth(); 
  const { WishlistItems } = useWishlist(); 
  const { isDarkMode, toggleTheme } = useTheme(); // 3. Theme toggle function nikala
  
  // States for menus and popups
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Calculate total items
  const TotalItems = CartItems.reduce((total, item) => total + item.Quantity, 0);
  const TotalWishlistItems = WishlistItems?.length || 0;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP & MOBILE HEADER BAR               */}
      {/* ========================================= */}
      {/* NAYA: Dark mode ki classes add ki - dark:bg-[#0f0f0f] dark:text-white */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
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
              <Link to="/" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">Shop</Link>
              <Link to="/mobile" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">Mobile</Link>
              <Link to="/tv" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">TV & Audio</Link>
              <Link to="/appliances" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">Appliances</Link>
              <Link to="/computing" className="hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">Computing</Link>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              
              {/* NAYA: Theme Toggle Button */}
              <button 
                onClick={toggleTheme} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Search Icon button */}
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist (Heart) Icon */}
              <Link to="/wishlist" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                <Heart className="w-5 h-5" />
                {TotalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {TotalWishlistItems}
                  </span>
                )}
              </Link>
              
              {/* Cart Icon */}
              <Link to="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {TotalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {TotalItems}
                  </span>
                )}
              </Link>
              
              {/* User Login/Greeting */}
              {CurrentUser ? (
                <Link to="/profile" className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors font-bold text-sm">
                  <div className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-[10px]">
                    {CurrentUser.Name.charAt(0)}
                  </div>
                  Hi, {CurrentUser.Name.split(' ')[0]}
                </Link>
              ) : (
                <Link to="/login" className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
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
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#1a1a1a] dark:text-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
           <span className="text-xl font-black tracking-tighter uppercase">Menu</span>
           <button onClick={closeMenu} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col overflow-y-auto py-2">
          <Link to="/" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Shop</Link>
          <Link to="/mobile" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Mobile</Link>
          <Link to="/tv" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">TV & Audio</Link>
          <Link to="/appliances" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Appliances</Link>
          <Link to="/computing" onClick={closeMenu} className="px-6 py-4 text-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Computing</Link>
          <Link to="/wishlist" onClick={closeMenu} className="px-6 py-4 text-lg font-bold border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5 fill-red-500" /> My Wishlist ({TotalWishlistItems})
          </Link>
        </div>
        
        {/* Mobile Footer/Login */}
        <div className="mt-auto p-6 bg-gray-50 dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-gray-800">
            {CurrentUser ? (
               <p className="text-sm font-bold text-center mb-4 text-blue-500">Welcome, {CurrentUser.Name}</p>
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Log in to your Samsung Account to access exclusive offers and track orders.</p>
                <Link to="/login" onClick={closeMenu} className="block text-center w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-full transition-colors">
                  Log In / Sign Up
                </Link>
              </>
            )}
        </div>
      </div>

      {/* Search Overlay Component */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;