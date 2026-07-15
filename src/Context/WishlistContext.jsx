import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // NAYA: Page load hone par pehle localStorage se wishlist history uthayega
  const [WishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('samsung_wishlist_items');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // NAYA: Jab bhi WishlistItems state change hogi, ye automatically localStorage me save kar dega
  useEffect(() => {
    localStorage.setItem('samsung_wishlist_items', JSON.stringify(WishlistItems));
  }, [WishlistItems]);

  const ToggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(item => item.Id === product.Id);
      
      if (exists) {
        // NAYA: Error ki jagah normal toast use kiya with hollow heart icon
        toast(`${product.Name} removed from wishlist`, { icon: '🤍' });
        return prev.filter(item => item.Id !== product.Id);
      } else {
        toast.success(`${product.Name} saved to wishlist!`, { icon: '❤️' });
        return [...prev, product];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ WishlistItems, ToggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);