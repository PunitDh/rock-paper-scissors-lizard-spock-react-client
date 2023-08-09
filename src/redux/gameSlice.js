import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentGame: {},
    currentUsers: [],
    recentGames: [],
  },
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setCurrentUsers: (state, action) => {
      state.currentUsers = action.payload;
    },
    setRecentGames: (state, action) => {
      state.recentGames = action.payload;
    },
  },
});

export const { setCurrentGame, setCurrentUsers, setRecentGames } =
  gameSlice.actions;

export default gameSlice.reducer;
