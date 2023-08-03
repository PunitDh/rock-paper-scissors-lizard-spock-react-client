import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./redux/gameSlice";
import menuSlice from "./redux/menuSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
    menu: menuSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
