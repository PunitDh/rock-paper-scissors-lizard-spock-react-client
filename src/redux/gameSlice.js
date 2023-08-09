import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentGame: {},
    currentUsers: [],
  },
  reducers: {
    setCurrentGame: (state, action) => {
      state.currentGame = action.payload;
    },
    setCurrentUsers: (state, action) => {
      state.currentUsers = action.payload;
    },
  },
});

export const { setCurrentGame, setCurrentUsers } = gameSlice.actions;

export default gameSlice.reducer;
