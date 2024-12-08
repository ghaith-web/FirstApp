import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      state[index] = updatedItem;
    },
    deleteItem: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { setItems, addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
