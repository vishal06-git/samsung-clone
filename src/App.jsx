import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Navbar from './Components/Layout/Navbar/Index'; 
import Footer from './Components/Layout/Footer';

// Pages
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Mobile from './Pages/Mobile'; 
import Category from './Pages/Category';
import OrderSuccess from './Pages/OrderSuccess';
import TrackOrder from './Pages/TrackOrder';
import Profile from './Pages/Profile';
import Wishlist from './Pages/Wishlist';
import Appliances from './Pages/Appliances';
import TvAudio from './Pages/TvAudio';
import Computing from './Pages/Computing';


// Contexts
import { CartProvider } from './Context/CartContext'; 
import { AuthProvider } from './Context/AuthContext'; 
import { WishlistProvider } from './Context/WishlistContext';
import { ThemeProvider } from './Context/ThemeContext';


function App() {
  return (
    <ThemeProvider> 
      <AuthProvider> 
        <CartProvider>
          <WishlistProvider> 
            <Router>
              <div className="min-h-screen flex flex-col font-sans bg-white text-black dark:bg-[#0f0f0f] dark:text-white transition-colors duration-300">
                
                {/* NAYA: Premium Toast Styling */}
                <Toaster 
                  position="bottom-center"
                  toastOptions={{
                    style: { 
                      background: '#1a1a1a', 
                      color: '#fff', 
                      borderRadius: '100px', 
                      padding: '16px 24px', 
                      fontWeight: '600',
                      fontSize: '14px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    },
                    success: {
                      iconTheme: { primary: '#fff', secondary: '#000' }
                    }
                  }} 
                />

                <Navbar />
                
                {/* NAYA FIX: Removed pt-16. Individual pages now handle their own Navbar overlapping for a true premium full-bleed effect. */}
                <main className="flex-grow flex flex-col">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/search" element={<Search />} />
                    <Route path="/mobile" element={<Mobile />} />
                    <Route path="/shop" element={<Category title="Shop All" />} />
                    
                    
                    
                    <Route path="/success/:orderId" element={<OrderSuccess />} />
                    <Route path="/track" element={<TrackOrder />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/appliances" element={<Appliances />} />
                    <Route path="/tv" element={<TvAudio />} />
                    <Route path="/computing" element={<Computing />} />
                  </Routes>
                </main>

                <Footer />
                
              </div>
            </Router>
          </WishlistProvider> 
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;