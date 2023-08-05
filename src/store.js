import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./redux/gameSlice";
import menuSlice from "./redux/menuSlice";
import playerSlice from "./redux/playerSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
    menu: menuSlice,
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
