import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

import Navbar from './Components/Layout/Navbar/Index'; 
import Footer from './Components/Layout/Footer';

// Saare Pages import kar liye
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
import HeroBanner from './Components/Ui/HeroBanner';
// Saare Contexts
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
                
                <Toaster 
                  position="bottom-center"
                  toastOptions={{
                    style: { background: '#333', color: '#fff', borderRadius: '100px', padding: '12px 24px', fontWeight: 'bold' }
                  }} 
                />

                <Navbar />
                
                <main className="flex-grow pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/search" element={<Search />} />
                    <Route path="/mobile" element={<Mobile />} />
                    <Route path="/shop" element={<Category title="Shop All" />} />
                    <Route path="/tv" element={<Category title="TV & Audio" />} />
                    <Route path="/appliances" element={<Category title="Home Appliances" />} />
                    <Route path="/computing" element={<Category title="Computing" />} />
                    <Route path="/success/:orderId" element={<OrderSuccess />} />
                    <Route path="/track" element={<TrackOrder />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    
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