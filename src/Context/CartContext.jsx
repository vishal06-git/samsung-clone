import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast'; // <-- 1. Import toast

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartItems, setCartItems] = useState([]);

  const AddToCart = (Product) => {
    setCartItems((PrevItems) => {
      const ExistingItem = PrevItems.find(item => item.Id === Product.Id);
      if (ExistingItem) {
        return PrevItems.map(item => 
          item.Id === Product.Id ? { ...item, Quantity: item.Quantity + 1 } : item
        );
      }
      return [...PrevItems, { ...Product, Quantity: 1 }];
    });
    
    // 2. Replace alert with a beautiful toast
    toast.success(`${Product.Name} added to cart!`); 
  };

  return (
    <CartContext.Provider value={{ CartItems, AddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};