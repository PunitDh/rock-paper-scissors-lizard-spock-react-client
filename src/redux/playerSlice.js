import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_KEY } from "../utils/constants";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    token: localStorage.getItem(TOKEN_KEY),
    currentGame: {},
    currentGames: [],
    recentGames: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
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
