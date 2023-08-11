import { createSlice } from "@reduxjs/toolkit";
import { IconDeviceGamepad2, IconLogout, IconUser } from "@tabler/icons";
import { uniqueId } from "lodash";
import { icons } from "src/data";

const menuMapper = (game) => ({
  id: game.id,
  title: game.name,
  icon: icons.find((icon) => icon.id === game.icon).icon,
  href: `/games/${game.id}`,
  gameContext: true,
  players: game.players,
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    Home: [
      {
        id: uniqueId(),
        title: "New Game",
        icon: IconDeviceGamepad2,
        href: "/games",
      },
    ],
    "Current Games": [],
    Settings: [
      {
        id: uniqueId(),
        title: "Profile",
        icon: IconUser,
        href: "/profile",
      },
      {
        id: uniqueId(),
        title: "Logout",
        icon: IconLogout,
        href: "/auth/logout",
      },
    ],
  },
  reducers: {
    setCurrentGames: (state, { payload = [] }) => {
      state["Current Games"] = payload.map(menuMapper);
    },
    updateCurrentGameMenu: (state, action) => {
      const gameIndex = state["Current Games"].findIndex(
        (it) => it.id === action.payload.id
      );
      state["Current Games"][gameIndex] = menuMapper(action.payload);
    },
  },
});

export const { setCurrentGames, updateCurrentGameMenu } = menuSlice.actions;

export default menuSlice.reducer;
