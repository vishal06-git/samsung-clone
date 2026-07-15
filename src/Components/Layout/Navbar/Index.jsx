import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Sun, Moon } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';
import { useAuth } from '../../../Context/AuthContext';
import { useWishlist } from '../../../Context/WishlistContext'; 
import { useTheme } from '../../../Context/ThemeContext'; 
import SearchOverlay from '../../Ui/SearchOverlay';

const Navbar = () => {
  const { CartItems } = useCart();
  const { User: CurrentUser } = useAuth(); 
  const { WishlistItems } = useWishlist(); 
  const { isDarkMode, toggleTheme } = useTheme(); 
  
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
      {/* PREMIUM DESKTOP & MOBILE HEADER BAR       */}
      {/* ========================================= */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white z-50 border-b border-gray-100 dark:border-gray-800/60 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          {/* NAYA: h-[76px] for premium spacious feel */}
          <div className="flex justify-between items-center h-[76px]">
            
            {/* Left: Mobile Menu Toggle & Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              {/* NAYA: Logo styling updated for authentic look */}
              <Link to="/" className="text-2xl sm:text-3xl font-black tracking-widest uppercase pb-1">
                SAMSUNG
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            {/* NAYA: hidden lg:flex taaki tablet pe overlap na ho, text-sm for clean look */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 text-sm font-bold">
              <Link to="/" className="hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-full transition-all duration-300">Shop</Link>
              <Link to="/mobile" className="hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-full transition-all duration-300">Mobile</Link>
              <Link to="/tv" className="hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-full transition-all duration-300">TV & Audio</Link>
              <Link to="/appliances" className="hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-full transition-all duration-300">Appliances</Link>
              <Link to="/computing" className="hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-full transition-all duration-300">Computing</Link>
            </div>

            {/* Right: Utility Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme} 
                className="p-2 sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-[22px] h-[22px] text-yellow-400" /> : <Moon className="w-[22px] h-[22px]" />}
              </button>

              {/* Search Icon button */}
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <Search className="w-[22px] h-[22px]" />
              </button>

              {/* Wishlist Icon with Sleek Badge */}
              <Link to="/wishlist" className="p-2 sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 relative group">
                <Heart className="w-[22px] h-[22px] group-hover:fill-current transition-all" />
                {TotalWishlistItems > 0 && (
                  <span className="absolute top-1 right-0.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0f0f0f]">
                    {TotalWishlistItems}
                  </span>
                )}
              </Link>
              
              {/* Cart Icon with Sleek Badge */}
              <Link to="/cart" className="p-2 sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 relative">
                <ShoppingCart className="w-[22px] h-[22px]" />
                {TotalItems > 0 && (
                  <span className="absolute top-1 right-0.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0f0f0f]">
                    {TotalItems}
                  </span>
                )}
              </Link>
              
              {/* User Login/Greeting */}
              {CurrentUser ? (
                <Link to="/profile" className="hidden lg:flex items-center gap-2 p-2 px-3 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300 font-bold text-sm ml-1">
                  <div className="w-7 h-7 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xs shadow-sm">
                    {CurrentUser.Name.charAt(0)}
                  </div>
                  <span>Hi, {CurrentUser.Name.split(' ')[0]}</span>
                </Link>
              ) : (
                <Link to="/login" className="hidden lg:block p-2 sm:p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all duration-300">
                  <User className="w-[22px] h-[22px]" />
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* ========================================= */}
      {/* MOBILE SLIDING MENU SECTION               */}
      {/* ========================================= */}

      {/* Dark Overlay (Smooth fade) */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMenu}
      ></div>

      {/* Sliding Panel (Premium styling) */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white dark:bg-[#0f0f0f] dark:text-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Menu Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800/60">
           <span className="text-xl font-black tracking-widest uppercase">Samsung</span>
           <button onClick={closeMenu} className="p-2 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
             <X className="w-5 h-5" />
           </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col overflow-y-auto py-2">
          <Link to="/" onClick={closeMenu} className="px-6 py-4 text-base font-bold border-b border-gray-50 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">Shop</Link>
          <Link to="/mobile" onClick={closeMenu} className="px-6 py-4 text-base font-bold border-b border-gray-50 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">Mobile</Link>
          <Link to="/tv" onClick={closeMenu} className="px-6 py-4 text-base font-bold border-b border-gray-50 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">TV & Audio</Link>
          <Link to="/appliances" onClick={closeMenu} className="px-6 py-4 text-base font-bold border-b border-gray-50 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">Appliances</Link>
          <Link to="/computing" onClick={closeMenu} className="px-6 py-4 text-base font-bold hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">Computing</Link>
          <Link to="/wishlist" onClick={closeMenu} className="px-6 py-4 text-base font-bold border-t border-gray-100 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" /> My Wishlist ({TotalWishlistItems})
          </Link>
        </div>
        
        {/* Mobile Footer/Login */}
        <div className="mt-auto p-6 bg-gray-50 dark:bg-[#151515] border-t border-gray-200 dark:border-gray-800/60">
            {CurrentUser ? (
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold shadow-md">
                    {CurrentUser.Name.charAt(0)}
                  </div>
                 <p className="text-sm font-bold">Welcome, {CurrentUser.Name}</p>
               </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">Log in to your Samsung Account to access exclusive offers and track orders.</p>
                <Link to="/login" onClick={closeMenu} className="block text-center w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-full transition-transform hover:scale-[1.02] shadow-lg">
                  Log In / Sign Up
                </Link>
              </>
            )}
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;