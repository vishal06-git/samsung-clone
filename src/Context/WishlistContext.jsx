import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [WishlistItems, setWishlistItems] = useState([]);

  const ToggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(item => item.Id === product.Id);
      if (exists) {
        toast.error(`${product.Name} removed from wishlist`);
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