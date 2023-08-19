import { VideoCall } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import {
  IconDashboard,
  IconDeviceGamepad2,
  IconLogout,
  IconUser,
} from "@tabler/icons";
import { uniqueId } from "lodash";
import { getIcon } from "src/assets";

const CURRENT_GAMES_NAV_GROUP = "Current Games";

const menuMapper = (game) => ({
  id: game.id,
  title: game.name,
  icon: getIcon(game.icon).icon,
  href: `/games/${game.id}`,
  gameContext: true,
  players: game.players,
  movePlayed: false,
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    Dashboard: [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconDashboard,
        href: "/dashboard",
        restricted: true,
      },
    ],
    Home: [
      {
        id: uniqueId(),
        title: "New Game",
        icon: IconDeviceGamepad2,
        href: "/games",
      },
    ],

    [CURRENT_GAMES_NAV_GROUP]: [],
    Utilities: [
      {
        id: uniqueId(),
        title: "Video Subtitle Translator",
        icon: VideoCall,
        href: "/video",
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
    setCurrentGamesNav: (state, { payload = [] }) => {
      state[CURRENT_GAMES_NAV_GROUP] = payload.map(menuMapper);
    },
    updateCurrentGameMenu: (state, action) => {
      const gameIndex = state[CURRENT_GAMES_NAV_GROUP].findIndex(
        (it) => it.id === action.payload.id
      );
      if (gameIndex > -1) {
        state[CURRENT_GAMES_NAV_GROUP][gameIndex] = menuMapper(action.payload);
      } else {
        state[CURRENT_GAMES_NAV_GROUP].push(menuMapper(action.payload));
      }
    },
    deleteGameFromMenu: (state, action) => {
      state[CURRENT_GAMES_NAV_GROUP] = state[CURRENT_GAMES_NAV_GROUP].filter(
        (game) => game.id !== action.payload.id
      );
    },
  },
});

export const { setCurrentGamesNav, updateCurrentGameMenu, deleteGameFromMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
