import { createSlice } from "@reduxjs/toolkit";
import { isBoolean } from "../utils";
import { ChatBoxStatus } from "../views/ChatBar/constants";

const findIndex = (state, action) =>
  state.conversations.findIndex((it) => it.id === action.payload.id);

const setConversation = (state, action) => (status) => {
  const index = findIndex(state, action);

  state.conversations[index] = {
    ...action.payload,
    status,
  };
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload
        .map((conversation) => {
          delete conversation.opener;
          return {
            ...conversation,
            status: ChatBoxStatus.CLOSED,
          };
        })
        .sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
    },

    startConversation: (state, action) => {
      const index = findIndex(state, action);

      const opener =
        isBoolean(action.payload.opener) && Boolean(action.payload.opener);

      const conversation = {
        ...action.payload,
        status: opener ? ChatBoxStatus.OPEN : ChatBoxStatus.CLOSED,
      };

      if (index !== -1) state.conversations[index] = conversation;
      else state.conversations.push(conversation);
    },

    openConversation: (state, action) => {
      setConversation(state, action)(ChatBoxStatus.OPEN);
    },

    closeConversation: (state, action) => {
      setConversation(state, action)(ChatBoxStatus.CLOSED);
    },

    minimizeConversation: (state, action) => {
      setConversation(state, action)(ChatBoxStatus.MINIMIZED);
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
