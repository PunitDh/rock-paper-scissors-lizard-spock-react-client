import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = gameSlice.actions;

export default gameSlice.reducer;
