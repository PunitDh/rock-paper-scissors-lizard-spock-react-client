import {
  IconDeviceGamepad2,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
  IconUserPlus,
} from "@tabler/icons";
import { currentGames } from "../../../data";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

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
    href: "/game",
  },
  {
    navlabel: true,
    subheader: "Current Games",
  },
  ...currentGames,
  {
    navlabel: true,
    subheader: "Auth",
  },
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
  {
    navlabel: true,
    subheader: "Settings",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/auth/login",
  },
];

export default Menuitems;
