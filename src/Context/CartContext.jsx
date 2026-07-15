import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // NAYA: Lazy initialization - Page load hone par pehle localStorage se cart history uthayega
  const [CartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('samsung_cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // NAYA: Jab bhi CartItems state change hogi, ye automatically localStorage me save kar dega
  useEffect(() => {
    localStorage.setItem('samsung_cart_items', JSON.stringify(CartItems));
  }, [CartItems]);

  // 1. Add To Cart Function
  const AddToCart = (Product, selectedColor = "Default") => {
    setCartItems((PrevItems) => {
      // NAYA: ID aur Color dono match karna zaroori hai (taaki same phone alag color me add ho sake)
      const ExistingItem = PrevItems.find(item => item.Id === Product.Id && item.selectedColor === selectedColor);
      
      if (ExistingItem) {
        return PrevItems.map(item => 
          (item.Id === Product.Id && item.selectedColor === selectedColor) 
            ? { ...item, Quantity: item.Quantity + 1 } 
            : item
        );
      }
      // NAYA: Product object me selectedColor bhi attach kar diya
      return [...PrevItems, { ...Product, Quantity: 1, selectedColor }];
    });
    
    toast.success(`${Product.Name} added to cart!`); 
  };

  // 2. Remove From Cart Function
  const RemoveFromCart = (productId, selectedColor) => {
    setCartItems((PrevItems) => 
      PrevItems.filter(item => !(item.Id === productId && item.selectedColor === selectedColor))
    );
    toast.success("Item removed from cart!");
  };

  // 3. NAYA: Update Quantity Function (Cart page me + aur - buttons ke liye)
  const UpdateQuantity = (productId, selectedColor, newQuantity) => {
    if (newQuantity < 1) return; // Quantity 1 se kam nahi ho sakti
    
    setCartItems((PrevItems) => 
      PrevItems.map(item => 
        (item.Id === productId && item.selectedColor === selectedColor)
          ? { ...item, Quantity: newQuantity } 
          : item
      )
    );
  };

  // 4. Clear Cart Function (Checkout successful hone ke baad)
  const ClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('samsung_cart_items'); // Storage se bhi clean kar diya
  };

  return (
    <CartContext.Provider value={{ CartItems, AddToCart, RemoveFromCart, UpdateQuantity, ClearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};