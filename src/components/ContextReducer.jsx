import React, { createContext, useContext, useReducer } from 'react';

// Create contexts for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
    default:
      console.error("Unknown action type:", action.type);
      return state; // Always return the current state for unknown actions
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Fix: Corrected `reducer` name
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Hook to use cart state
export const useCart = () => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Hook to use cart dispatch
export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context;
};
