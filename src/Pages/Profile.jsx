import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { User: CurrentUser, Logout } = useAuth(); 
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    // Agar user logged in nahi hai, toh wapas login page par bhej do
    if (!CurrentUser) {
      navigate('/login');
      return;
    }

    // LocalStorage se user ke orders nikalo
    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    // Naye orders upar dikhane ke liye reverse kiya
    setMyOrders(existingOrders.reverse()); 
  }, [CurrentUser, navigate]);

  if (!CurrentUser) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 min-h-[70vh] bg-gray-50">
      <h1 className="text-4xl font-black mb-10">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar: User Details */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {CurrentUser.Name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">{CurrentUser.Name}</h2>
                <p className="text-gray-500">{CurrentUser.Email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full text-left p-4 rounded-xl bg-gray-50 font-bold text-black transition-colors">
                <User className="w-5 h-5" /> Account Details
              </button>
              <button className="flex items-center gap-3 w-full text-left p-4 rounded-xl hover:bg-gray-50 font-medium text-gray-600 transition-colors">
                <Package className="w-5 h-5" /> Saved Addresses
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={() => {
                  if(Logout) Logout();
                  navigate('/');
                }}
                className="flex items-center gap-3 w-full text-left p-4 rounded-xl hover:bg-red-50 hover:text-red-600 font-medium text-gray-600 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Order History */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" /> Order History
            </h3>

            {myOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-500 mb-6">You haven't placed any orders yet.</p>
                <Link to="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {myOrders.map((order, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-gray-100 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                        <p className="font-bold text-black">{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-black">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="font-bold text-black">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-600 font-medium">{order.items?.length || 0} items in this order</p>
                      <Link to={`/track`} className="flex items-center gap-1 text-black font-bold hover:underline">
                        Track Order <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;