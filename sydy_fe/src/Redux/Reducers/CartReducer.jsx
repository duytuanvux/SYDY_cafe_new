import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  cart: [],
} ;
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      
      const itemInCart = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
  
    },
    removeItem: (state, action) => {
      const itemInCartIndex = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.sugar === action.payload.sugar &&
          item.ice === action.payload.ice
      );

      if (itemInCartIndex > -1) {
        state.cart.splice(itemInCartIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const CartReducer = CartSlice.reducer;
export const { addToCart, removeItem, clearCart } = CartSlice.actions;
