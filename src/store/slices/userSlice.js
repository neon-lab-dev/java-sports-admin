import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isAuthenticating: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const { setUser, logoutUser, setIsAuthenticating } = userSlice.actions;

export default userSlice.reducer;
