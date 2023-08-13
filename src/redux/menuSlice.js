import { createSlice } from "@reduxjs/toolkit";
import { IconDeviceGamepad2, IconLogout, IconUser } from "@tabler/icons";
import { uniqueId } from "lodash";
import { icons } from "src/data";

const CURRENT_GAMES_MENU = "Current Games";

const menuMapper = (game) => ({
  id: game.id,
  title: game.name,
  icon: icons.find((icon) => icon.id === game.icon).icon,
  href: `/games/${game.id}`,
  gameContext: true,
  players: game.players,
  movePlayed: false,
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
    [CURRENT_GAMES_MENU]: [],
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
      state[CURRENT_GAMES_MENU] = payload.map(menuMapper);
    },
    updateCurrentGameMenu: (state, action) => {
      const gameIndex = state[CURRENT_GAMES_MENU].findIndex(
        (it) => it.id === action.payload.id
      );
      if (gameIndex > -1) {
        state[CURRENT_GAMES_MENU][gameIndex] = menuMapper(action.payload);
      } else {
        state[CURRENT_GAMES_MENU].push(menuMapper(action.payload));
      }
    },
    // setMovePlayedNotification: (state, action) => {
    //   const game = state[CURRENT_GAMES_MENU].find(
    //     (it) => it.id === action.payload.gameId
    //   );

    //   game.movePlayed = action.payload.movePlayed;
    // },
    deleteGameFromMenu: (state, action) => {
      state[CURRENT_GAMES_MENU] = state[CURRENT_GAMES_MENU].filter(
        (game) => game.id !== action.payload.id
      );
    },
  },
});

export const { setCurrentGamesNav, updateCurrentGameMenu, deleteGameFromMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
