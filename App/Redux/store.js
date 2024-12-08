import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
