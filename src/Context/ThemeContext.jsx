import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // NAYA: Pehle localStorage check karega, agar wahan kuch nahi mila toh User ke Device ka theme check karega
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('samsung_theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Agar naya user hai, toh uske OS/Device ka default preference check karo
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('samsung_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('samsung_theme', 'light');
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