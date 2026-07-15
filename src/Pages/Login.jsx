import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Toggle state: true = Login, false = Sign Up
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Form fields
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  
  const { Login, Register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // NAYA: Ab email aur password dono use karke mock login kar rahe hain
      Login(Email, Password);
    } else {
      Register(Name, Email, Password);
    }
    
    navigate('/'); 
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLoginMode(!isLoginMode);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    // NAYA: Dark mode wrapper classes aur premium spacing add ki
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-24 flex justify-center items-center min-h-[85vh] bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      
      {/* NAYA: Card design ko dark mode compatible aur sleek banaya */}
      <div className="w-full max-w-[440px] bg-white dark:bg-[#151515] p-8 md:p-12 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-none transition-all duration-300 animate-fade-in-up">
        
        {/* Dynamic Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-3 text-black dark:text-white tracking-tight">
          {isLoginMode ? 'Sign In' : 'Create Account'}
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm font-medium">
          {isLoginMode 
            ? 'Access your orders, wishlist, and exclusive offers.' 
            : 'Join Samsung to unlock exclusive benefits and personalized experiences.'}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Name field (Sign Up Mode Only) */}
          {!isLoginMode && (
            <div className="animate-fade-in">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest">
                Full Name
              </label>
              <input 
                type="text" 
                value={Name}
                onChange={(e) => setName(e.target.value)}
                // NAYA: Inputs with dark mode borders and premium focus ring
                className="w-full bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-transparent dark:border-gray-800 rounded-xl p-4 text-black dark:text-white focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                placeholder="xyz"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest">
              Email Address
            </label>
            <input 
              type="email" 
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-transparent dark:border-gray-800 rounded-xl p-4 text-black dark:text-white focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all placeholder-gray-400 dark:placeholder-gray-600 font-medium"
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest">
              Password
            </label>
            <input 
              type="password" 
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f8f8f8] dark:bg-[#1a1a1a] border border-transparent dark:border-gray-800 rounded-xl p-4 text-black dark:text-white focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white transition-all placeholder-gray-400 dark:placeholder-gray-600 font-medium"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-full mt-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg text-lg"
          >
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Bottom Toggle Section */}
        <div className="mt-10 text-center text-sm border-t border-gray-100 dark:border-gray-800 pt-8">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={toggleMode} 
            className="font-bold text-black dark:text-white hover:underline focus:outline-none ml-1 transition-colors"
          >
            {isLoginMode ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;