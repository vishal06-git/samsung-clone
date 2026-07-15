import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [CartItems, setCartItems] = useState([]);

  // 1. Add To Cart
  const AddToCart = (product, selectedColor) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.Id === product.Id && item.selectedColor === selectedColor);
      
      if (existingItem) {
        return prev.map(item => 
          (item.Id === product.Id && item.selectedColor === selectedColor) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedColor, quantity: 1 }];
    });
  };

  // 2. Remove Item
  const RemoveFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.Id === id && item.selectedColor === color)));
  };

  // 3. Update Quantity
  const UpdateQuantity = (id, color, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.Id === id && item.selectedColor === color) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  // 4. Clear Cart (Checkout ke baad empty karne ke liye)
  const ClearCart = () => {
    setCartItems([]);
  };

  // RETURN hamesha saare functions declare hone ke baad, sabse last mein aana chahiye
  return (
    <CartContext.Provider value={{ CartItems, AddToCart, RemoveFromCart, UpdateQuantity, ClearCart }}>
      {children}
    </CartContext.Provider>
  );
};