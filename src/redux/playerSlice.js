import { createSlice } from "@reduxjs/toolkit";
import { tokenKey } from "src/utils/constants";

export const menuSlice = createSlice({
  name: "player",
  initialState: {
    token: localStorage.getItem(tokenKey),
    currentGames: [],
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
    setCurrentGames: (state, action) => {
      state.currentGames = action.payload;
    },
  },
});

export const { setToken, clearToken, setCurrentGames } = menuSlice.actions;

export default menuSlice.reducer;
