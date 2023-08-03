import { createSlice } from "@reduxjs/toolkit";
import {
  IconAbacus,
  IconAtom,
  IconAtom2,
  IconBallBaseball,
  IconBallBasketball,
  IconBallBowling,
  IconBallFootball,
  IconBallTennis,
  IconBallVolleyball,
  IconChess,
  IconChessBishop,
  IconChessKing,
  IconChessKnight,
  IconChessQueen,
  IconChessRook,
  IconDeviceGamepad2,
  IconGoGame,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
  IconTrophy,
  IconUserPlus,
} from "@tabler/icons";
import { uniqueId, sample } from "lodash";

const icons = [
  IconChess,
  IconGoGame,
  IconTrophy,
  IconAbacus,
  IconChessBishop,
  IconAtom2,
  IconAtom,
  IconChessKing,
  IconChessKnight,
  IconChessQueen,
  IconChessRook,
  IconBallBaseball,
  IconBallBasketball,
  IconBallBowling,
  IconBallFootball,
  IconBallTennis,
  IconBallVolleyball,
];

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    Home: [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
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
        title: "Logout",
        icon: IconLogout,
        href: "/auth/logout",
      },
    ],
  },
  reducers: {
    setCurrentGames: (state, { payload = [] }) => {
      state["Current Games"] = payload.map((game) => ({
        id: game.id,
        title: game.name,
        icon: sample(icons),
        href: `/games/${game.id}`,
        gameContext: true,
      }));
    },
  },
});

export const { setCurrentGames } = menuSlice.actions;

export default menuSlice.reducer;
