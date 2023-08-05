import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const tokenKey = "rpsls-token";

export const menuSlice = createSlice({
  name: "player",
  initialState: {
    token: localStorage.getItem(tokenKey),
    decoded: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(tokenKey, action.payload);
      state.decoded = jwtDecode(localStorage.getItem(tokenKey));
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem(tokenKey);
    },
  },
});

export const { setToken, clearToken } = menuSlice.actions;

export default menuSlice.reducer;
