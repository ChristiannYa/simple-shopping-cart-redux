import { RootState } from "../../app/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
}

const findCartItem = (items: CartItem[], id: number) =>
  items.find((item) => item.id === id);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as CartItem[],
  },
  reducers: {
    addItemToCart: (
      state,
      // Omit 'quantity' from payload type since the quantity is modified
      // in the cart, not the from product list itself
      action: PayloadAction<Omit<CartItem, "quantity">>
    ) => {
      const existingItem = findCartItem(state.items, action.payload.id);

      if (!existingItem) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = findCartItem(state.items, id);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = findCartItem(state.items, id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  incrementQuantity,
  removeItemFromCart,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsItemInCart = (state: RootState, productId: number) =>
  state.cart.items.some((item) => item.id === productId);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export default cartSlice.reducer;
