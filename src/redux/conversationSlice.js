import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    currentConversation: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
  },
});

export const { setConversations, setCurrentConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
