import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  // Existing Login Function
  const Login = (email, password) => {
    // Real app me yaha pehle check hota ki email database me hai ya nahi
    setUser({ Name: "Vishal", Email: email });
    toast.success("Logged in successfully!");
  };

  // NEW: Register Function
  const Register = (name, email, password) => {
    // Naya user create karke seedha login state me daal diya
    setUser({ Name: name, Email: email });
    toast.success(`Welcome to Samsung, ${name}! Account created.`);
  };

  const Logout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    // Provider me Register function bhi pass kar diya
    <AuthContext.Provider value={{ User, Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};