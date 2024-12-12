import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import favoritesReducer from "./favoritesSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});

export default store;
