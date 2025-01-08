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
          img:action.img,
          qty: action.qty,
          size: action.size,

        },
      ]
      case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
      case "UPDATE":
        let arr = [...state]
        arr.find((food, index)=>{
          if(food.id === action.id){
            console.log(food.qty, parseInt(action.qty), action.price + food.price)
            arr[index] = {...food, qty:parseInt(action.qty) + food.qty, price:action.price + food.price}
          }
          return arr;
        })
        return arr;
      case "DROP" :
        let emptyArray = []
        return emptyArray 
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
