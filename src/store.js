import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./redux/gameSlice";
import menuSlice from "./redux/menuSlice";
import playerSlice from "./redux/playerSlice";
import siteSlice from "./redux/siteSlice";
import conversationSlice from "./redux/conversationSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
    menu: menuSlice,
    player: playerSlice,
    site: siteSlice,
    conversation: conversationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
