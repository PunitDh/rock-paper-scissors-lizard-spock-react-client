import { createSlice } from "@reduxjs/toolkit";
import {
  IconDeviceGamepad2,
  IconLogin,
  IconLogout,
  IconUser,
  IconUserPlus,
} from "@tabler/icons";
import { uniqueId } from "lodash";
import { icons } from "src/data";

const menuMapper = (game) => ({
  id: game.id,
  title: game.name,
  icon: icons.find((icon) => icon.id === game.icon).icon,
  href: `/games/${game.id}`,
  gameContext: true,
  players: game.players,
  //icon: game.icon
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    Home: [
      // {
      //   id: uniqueId(),
      //   title: "Dashboard",
      //   icon: IconLayoutDashboard,
      //   href: "/dashboard",
      // },
      {
        id: uniqueId(),
        title: "New Game",
        icon: IconDeviceGamepad2,
        href: "/games",
      },
    ],
    "Current Games": [],
    Auth: [
      {
        id: uniqueId(),
        title: "Login",
        icon: IconLogin,
        href: "/auth/login",
      },
      {
        id: uniqueId(),
        title: "Register",
        icon: IconUserPlus,
        href: "/auth/register",
      },
    ],
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
