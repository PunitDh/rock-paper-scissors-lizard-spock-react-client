import { createSlice } from "@reduxjs/toolkit";
import { ConversationState } from "src/views/ChatBar/constants";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload.map((conversation) => ({
        ...conversation,
        state: ConversationState.CLOSED,
      }));
    },
    startConversation: (state, action) => {
      const index = state.conversations.findIndex(
        (it) => it.id === action.payload.id
      );

      const conversation = {
        ...action.payload,
        state: action.payload.opener
          ? ConversationState.OPEN
          : ConversationState.CLOSED,
      };
      
      if (index !== -1) state.conversations[index] = conversation;
      else state.conversations.push(conversation);
    },
    openConversation: (state, action) => {
      const index = state.conversations.findIndex(
        (it) => it.id === action.payload.id
      );
      state.conversations[index] = {
        ...action.payload,
        state: ConversationState.OPEN,
      };
    },
    closeConversation: (state, action) => {
      const index = state.conversations.findIndex(
        (it) => it.id === action.payload.id
      );
      state.conversations[index] = {
        ...state.conversations[index],
        state: ConversationState.CLOSED,
      };
    },
    minimizeConversation: (state, action) => {
      const index = state.conversations.findIndex(
        (it) => it.id === action.payload.id
      );
      state.conversations[index] = {
        ...state.conversations[index],
        state: ConversationState.MINIMIZED,
      };
    },
  },
});

export const {
  setConversations,
  startConversation,
  openConversation,
  closeConversation,
  minimizeConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
