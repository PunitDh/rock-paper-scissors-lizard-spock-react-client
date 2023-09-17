import {
  Api,
  Calculate,
  ColorLens,
  ContentCut,
  FoodBank,
  VideoCall,
} from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import {
  IconDashboard,
  IconDeviceGamepad,
  IconFileSpreadsheet,
  IconLogout,
  IconTicTac,
  IconUser,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
import { getIcon } from "../assets";
import { listOf } from "../utils/List";

const CURRENT_GAMES = "Current Games";

const menuMapper = (game) => ({
  id: game.id,
  title: game.name,
  icon: getIcon(game.icon).icon,
  href: `/apps/${game.id}`,
  gameContext: true,
  players: game.players,
  movePlayed: false,
});

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    Admin: [
      {
        id: uniqueId("admin-"),
        title: "Dashboard",
        icon: IconDashboard,
        href: "/dashboard",
        restricted: true,
      },
    ],
    Home: [
      {
        id: uniqueId("apps-"),
        title: "Apps",
        icon: IconDeviceGamepad,
        href: "/apps",
      },
    ],

    Games: [
      {
        id: uniqueId("games-"),
        title: "Rock Paper Scissors",
        icon: ContentCut,
        href: "/apps/rpsls",
      },
      {
        id: uniqueId("games-"),
        title: "Tic Tac Toe (Coming Soon)",
        icon: IconTicTac,
        href: "/apps/tictactoe",
        restricted: true,
      },
    ],

    Apps: listOf(
      {
        id: uniqueId("apps-"),
        title: "Video Subtitles",
        icon: VideoCall,
        href: "/utils/video",
      },
      {
        id: uniqueId("apps-"),
        title: "Calculator",
        icon: Calculate,
        href: "/utils/calculator",
      },
      {
        id: uniqueId("apps-"),
        title: "Color Picker",
        icon: ColorLens,
        href: "/utils/color",
      },
      {
        id: uniqueId("apps-"),
        title: "Flavor Match",
        icon: FoodBank,
        href: "/utils/recipes",
      },
      {
        id: uniqueId("apps-"),
        title: "Get Sum Rest",
        icon: Api,
        href: "/utils/rest?requestTab=0",
      },
      {
        id: uniqueId("apps-"),
        title: "Spreadsheet",
        icon: IconFileSpreadsheet,
        href: "/utils/sheets",
      }
    ).sortBy((it) => it.title),
    [CURRENT_GAMES]: [],

    Settings: [
      {
        id: uniqueId("settings-"),
        title: "Profile",
        icon: IconUser,
        href: "/profile",
      },
      {
        id: uniqueId("settings-"),
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
