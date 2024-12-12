import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: '',
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.error = null;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = '';
      state.error = null;
    },
  },
});

export const { loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;
