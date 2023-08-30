import { Calculate, ColorLens, ContentCut, VideoCall } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import {
  IconDashboard,
  IconDeviceGamepad,
  IconLogout,
  IconTicTac,
  IconUser,
} from "@tabler/icons";
import { uniqueId } from "lodash";
import { getIcon } from "src/assets";

const CURRENT_GAMES = "Current Games";

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
    Admin: [
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
        title: "Games",
        icon: IconDeviceGamepad,
        href: "/games",
      },
      {
        id: uniqueId(),
        title: "Rock Paper Scissors",
        icon: ContentCut,
        href: "/games/rpsls",
      },
      {
        id: uniqueId(),
        title: "Tic Tac Toe",
        icon: IconTicTac,
        href: "/games/tictactoe",
        restricted: true,
      },
    ],

    [CURRENT_GAMES]: [],
    Utilities: [
      {
        id: uniqueId(),
        title: "Calculator",
        icon: Calculate,
        href: "/utils/calculator",
      },
      {
        id: uniqueId(),
        title: "Color Picker",
        icon: ColorLens,
        href: "/utils/color",
      },
      {
        id: uniqueId(),
        title: "Video Subtitles",
        icon: VideoCall,
        href: "/utils/video",
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
      state[CURRENT_GAMES] = payload.map(menuMapper);
    },
    updateCurrentGameMenu: (state, action) => {
      const gameIndex = state[CURRENT_GAMES].findIndex(
        (it) => it.id === action.payload.id
      );
      if (gameIndex > -1) {
        state[CURRENT_GAMES][gameIndex] = menuMapper(action.payload);
      } else {
        state[CURRENT_GAMES].push(menuMapper(action.payload));
      }
    },
    deleteGameFromMenu: (state, action) => {
      state[CURRENT_GAMES] = state[CURRENT_GAMES].filter(
        (game) => game.id !== action.payload.id
      );
    },
  },
});

export const { setCurrentGamesNav, updateCurrentGameMenu, deleteGameFromMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
