import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./redux/gameSlice";
import mesageSlice from "./redux/mesageSlice";

export default configureStore({
  reducer: {
    game: gameSlice,
    messages: mesageSlice,
  },
});
