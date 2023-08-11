import { createSlice } from "@reduxjs/toolkit";
import { tokenKey } from "src/utils/constants";

export const menuSlice = createSlice({
  name: "player",
  initialState: {
    token: localStorage.getItem(tokenKey),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(tokenKey, action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem(tokenKey);
    },
  },
});

export const { setToken, clearToken } = menuSlice.actions;

export default menuSlice.reducer;
