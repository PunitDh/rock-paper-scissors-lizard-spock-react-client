import { createSlice } from "@reduxjs/toolkit";
import { tokenKey } from "src/utils/constants";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    token: localStorage.getItem(tokenKey),
    currentGame: {},
    currentGames: [],
    recentGames: [],
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
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setCurrentUsers: (state, action) => {
      state.currentUsers = action.payload;
    },
    setRecentGames: (state, action) => {
      state.recentGames = action.payload;
    },
    updateCurrentGame: (state, action) => {
      if (state.currentGame.id === action.payload.id) {
        state.currentGame = action.payload;
      }
    },
  },
});

export const {
  setToken,
  clearToken,
  setCurrentGames,
  setCurrentGame,
  setCurrentUsers,
  setRecentGames,
  updateCurrentGame,
} = playerSlice.actions;

export default playerSlice.reducer;
