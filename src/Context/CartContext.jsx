import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [CartItems, setCartItems] = useState([]);

  // 1. Add To Cart Function (Pehle se tha)
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
    
    toast.success(`${Product.Name} added to cart!`); 
  };

  // 2. NAYA: Remove From Cart Function
  const RemoveFromCart = (productId) => {
    // Jo id match nahi karegi, sirf wahi items bachenge (yaani selected item delete ho jayega)
    setCartItems((PrevItems) => PrevItems.filter(item => item.Id !== productId));
    toast.success("Item removed from cart!");
  };

  // 3. NAYA: Clear Cart Function (Checkout ke time use hoga)
  const ClearCart = () => {
    setCartItems([]); // Pura cart array khali kar diya
  };

  return (
    // DHYAN DO: Yahan value={...} me humne naye functions bhi daal diye hain
    <CartContext.Provider value={{ CartItems, AddToCart, RemoveFromCart, ClearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};