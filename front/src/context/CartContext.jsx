import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems
        };
      } else {
        // Add new item with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // Try to load cart from localStorage
  const initialCart = {
    items: []
  };
  
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  
  // Calculate total price
  const totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: itemId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const value = {
    cart,
    items: cart.items,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};