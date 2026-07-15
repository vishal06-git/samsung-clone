import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, LogOut, ChevronRight, Settings } from 'lucide-react';

const Profile = () => {
  const { User: CurrentUser, Logout } = useAuth(); 
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (!CurrentUser) {
      navigate('/login');
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem('samsung_orders')) || [];
    setMyOrders(existingOrders.reverse()); 
  }, [CurrentUser, navigate]);

  if (!CurrentUser) return null;

  return (
    // NAYA: pt-24 taaki Navbar ke neeche na dabe, and Dark Mode wrapper
    <div className="w-full bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">My Account</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Sidebar: User Details */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#f4f4f4] dark:bg-[#151515] rounded-[2rem] p-8 md:p-10 sticky top-28 border border-transparent dark:border-gray-800 shadow-sm animate-fade-in-up">
              
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-3xl font-black shadow-inner">
                  {CurrentUser.Name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-tight mb-1">{CurrentUser.Name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">{CurrentUser.Email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-white dark:bg-[#222] font-bold text-black dark:text-white transition-colors border border-gray-100 dark:border-gray-700 shadow-sm">
                  <span className="flex items-center gap-3"><User className="w-5 h-5" /> Account Details</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-white dark:hover:bg-[#222] font-medium text-gray-600 dark:text-gray-300 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <span className="flex items-center gap-3"><Package className="w-5 h-5" /> Saved Addresses</span>
                </button>

                <button className="flex items-center justify-between w-full p-4 rounded-2xl hover:bg-white dark:hover:bg-[#222] font-medium text-gray-600 dark:text-gray-300 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <span className="flex items-center gap-3"><Settings className="w-5 h-5" /> Preferences</span>
                </button>
                
                {/* Logout Button */}
                <button 
                  onClick={() => {
                    if(Logout) Logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-3 w-full text-left p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 font-medium text-gray-600 dark:text-gray-400 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: Order History */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-[#151515] rounded-[2rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Package className="w-6 h-6 text-black dark:text-white" /> Order History
              </h3>

              {myOrders.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="w-20 h-20 bg-white dark:bg-[#222] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Package className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">You haven't placed any orders yet.</p>
                  <Link to="/" className="inline-block bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {myOrders.map((order, index) => (
                    // NAYA: Order Card in Dark Mode
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 md:p-8 hover:border-black dark:hover:border-white transition-colors duration-300 bg-gray-50 dark:bg-[#1a1a1a]">
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-bold">Order ID</p>
                          <p className="font-bold text-black dark:text-white truncate">{order.orderId}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-bold">Date</p>
                          <p className="font-medium text-black dark:text-white">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 font-bold">Total</p>
                          <p className="font-bold text-black dark:text-white">₹{order.total.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-start md:justify-end">
                          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-green-200 dark:border-green-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                           {/* Quick preview of items (showing max 3 avatars) */}
                           <div className="flex -space-x-3">
                             {order.items?.slice(0, 3).map((item, i) => (
                               <div key={i} className="w-10 h-10 rounded-full bg-white dark:bg-[#222] border-2 border-gray-50 dark:border-[#1a1a1a] flex items-center justify-center p-1 overflow-hidden z-10">
                                 <img src={item.ImageUrl || item.images?.[0]} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                               </div>
                             ))}
                           </div>
                           <p className="text-gray-600 dark:text-gray-400 font-medium text-sm ml-2">
                             {order.items?.length || 0} item(s) in this order
                           </p>
                        </div>
                        
                        <Link to={`/track`} className="flex items-center justify-center gap-2 bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-700 px-6 py-2.5 rounded-full text-black dark:text-white font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                          Track Order
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
    </div>
  );
};

export default Profile;