import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity });
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
      }
    },
    deleteItem(state, action) {
      const itemId = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemId
      );
      const existingItem = state.items[existingItemIndex];

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      existingItem.quantity++;
      state.totalQuantity++;
      state.totalPrice += existingItem.price;
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalPrice -= existingItem.price;
        state.totalQuantity -= existingItem.quantity;
      } else {
        existingItem.quantity--;
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      }
    },
  },
});
export const { addItem, deleteItem, decreaseQuantity, increaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
