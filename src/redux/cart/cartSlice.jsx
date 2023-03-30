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
    // deleteItem(state, action) {

    // }
  },
});
export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
