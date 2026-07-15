import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // NAYA: Lazy initialization - Page load hone par pehle localStorage check karega
  const [User, setUser] = useState(() => {
    const savedUser = localStorage.getItem('samsung_user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login Function with LocalStorage
  const Login = (email, password) => {
    // Real app me yaha API call hoti
    const userData = { Name: "xyz", Email: email };
    
    setUser(userData);
    localStorage.setItem('samsung_user_session', JSON.stringify(userData)); // Session save kar liya
    
    // Premium Samsung-style toast message
    toast.success("Signed in to your Samsung Account.");
  };

  // Register Function with LocalStorage
  const Register = (name, email, password) => {
    const userData = { Name: name, Email: email };
    
    setUser(userData);
    localStorage.setItem('samsung_user_session', JSON.stringify(userData)); // Session save kar liya
    
    toast.success(`Welcome to Samsung, ${name}!`);
  };

  // Logout Function
  const Logout = () => {
    setUser(null);
    localStorage.removeItem('samsung_user_session'); // Session delete kar diya
    toast.success("Signed out successfully.");
  };

  return (
    <AuthContext.Provider value={{ User, Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};