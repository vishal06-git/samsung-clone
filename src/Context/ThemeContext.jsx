import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if saved preference is dark
    return localStorage.getItem('samsung_theme') === 'dark';
  });

  useEffect(() => {
    // Ye line check karti hai ki DOM ready hai ya nahi
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('samsung_theme', 'dark');
      console.log("Dark mode enabled"); // Debugging ke liye
    } else {
      root.classList.remove('dark');
      localStorage.setItem('samsung_theme', 'light');
      console.log("Light mode enabled"); // Debugging ke liye
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);