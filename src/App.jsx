import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- 1. Import Toaster
import Navbar from './Components/Layout/Navbar/Index'; 
import Footer from './Components/Layout/Footer';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Mobile from './Pages/Mobile'; 
import { CartProvider } from './Context/CartContext'; 
import { AuthProvider } from './Context/AuthContext'; 
import Category from './Pages/Category'
import OrderSuccess from './Pages/OrderSuccess';
import TrackOrder from './Pages/TrackOrder';


function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-sans">
            
            {/* 2. Add Toaster here so it renders globally */}
            <Toaster 
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                  borderRadius: '100px',
                  padding: '12px 24px',
                  fontWeight: 'bold'
                }
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
                <Route path="/cart" element={<Cart />} />
                <Route path="/success/:orderId" element={<OrderSuccess />} />
                <Route path="/track" element={<TrackOrder />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;