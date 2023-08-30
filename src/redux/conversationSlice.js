import { createSlice } from "@reduxjs/toolkit";
import { Status } from "src/views/ChatBar/constants";

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
            status: Status.CLOSED,
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
        typeof action.payload.opener === "boolean" &&
        Boolean(action.payload.opener);

      const conversation = {
        ...action.payload,
        status: opener ? Status.OPEN : Status.CLOSED,
      };

      if (index !== -1) state.conversations[index] = conversation;
      else state.conversations.push(conversation);
    },

    openConversation: (state, action) => {
      setConversation(state, action)(Status.OPEN);
    },

    closeConversation: (state, action) => {
      setConversation(state, action)(Status.CLOSED);
    },

    minimizeConversation: (state, action) => {
      setConversation(state, action)(Status.MINIMIZED);
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
