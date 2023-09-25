import { createSlice } from "@reduxjs/toolkit";
import { isBoolean } from "../utils";
import { ChatBoxStatus } from "../views/ChatBar/constants";
import { Conversation, ConversationState } from "./types";

const findIndex = (
  state: ConversationState,
  action: { payload: any; type?: string },
): number => state.conversations.findIndex((it) => it.id === action.payload.id);

const setConversation =
  (state: ConversationState, action: { payload: any; type?: string }) =>
  (status: ChatBoxStatus) => {
    const index = findIndex(state, action);

    state.conversations[index] = {
      ...action.payload,
      status,
    };
  };

const initialState: ConversationState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state: ConversationState, action) => {
      state.conversations = action.payload
        .map((conversation: Conversation) => {
          delete conversation.opener;
          return {
            ...conversation,
            status: ChatBoxStatus.CLOSED,
          } as Conversation;
        })
        .sort(
          (a: Conversation, b: Conversation) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        );
    },

    startConversation: (state: ConversationState, action) => {
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

    openConversation: (state: ConversationState, action) => {
      setConversation(state, action)(ChatBoxStatus.OPEN);
    },

    closeConversation: (state: ConversationState, action) => {
      setConversation(state, action)(ChatBoxStatus.CLOSED);
    },

    minimizeConversation: (state: ConversationState, action) => {
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
