import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "messages",
  initialState: {
    all: {},
  },
  reducers: {
    setMessages: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { setMessages } = gameSlice.actions;

export default gameSlice.reducer;
