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
      // Login mode active
      Login(Email, Password);
    } else {
      // Sign up mode active
      Register(Name, Email, Password);
    }
    
    navigate('/'); // Form submit hone ke baad home page par bhej do
  };

  // Toggle function
  const toggleMode = (e) => {
    e.preventDefault();
    setIsLoginMode(!isLoginMode);
    // Form fields reset kar do mode change hone par
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-sm transition-all duration-300">
        
        {/* Dynamic Header based on state */}
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLoginMode ? 'Sign in to your account' : 'Create an account'}
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          {isLoginMode 
            ? 'Track orders, leave reviews, and get exclusive offers.' 
            : 'Join Samsung to unlock exclusive benefits and personalized offers.'}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name field - ONLY visible when in Sign Up mode */}
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input 
                type="text" 
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:border-black"
                placeholder="Vishal Sharma"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2">Email address</label>
            <input 
              type="email" 
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:border-black"
              placeholder="example@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:border-black"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white font-bold py-4 rounded-full mt-4 hover:bg-gray-800 transition-colors"
          >
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Dynamic Toggle Link at the bottom */}
        <div className="mt-8 text-center text-sm border-t border-gray-200 pt-6">
          <span className="text-gray-500">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button onClick={toggleMode} className="font-bold text-black hover:underline focus:outline-none">
            {isLoginMode ? 'Create one' : 'Sign in instead'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;