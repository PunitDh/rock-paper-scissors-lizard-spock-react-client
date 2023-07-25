import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentGames: [],
  },
  reducers: {
    setCurrentGames: (state, action) => {
      state.currentGames = action.payload;
    },
  },
});

export const { setCurrentGames } = gameSlice.actions;

export default gameSlice.reducer;
