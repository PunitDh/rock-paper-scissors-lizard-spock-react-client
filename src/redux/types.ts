import { NavItemType } from "../layouts/FullLayout/Sidebar/types";
import { ChatBoxStatus } from "../views/ChatBar/constants";

export const CURRENT_GAMES = "Current Games" as const;

export type PlayerState = {
  token: string | null;
  currentGame: { [key: string]: any };
  currentUsers: { [key: string]: any }[];
  currentGames: { [key: string]: any }[];
  recentGames: { [key: string]: any }[];
};

type NavGroup = {
  maximized: boolean;
  items: NavItemType[];
};

export type MenuState = {
  Admin: NavGroup;
  Home: NavGroup;
  Games: NavGroup;
  Apps: NavGroup;
  Messages: NavGroup;
  [CURRENT_GAMES]: NavGroup;
  Settings: NavGroup;
};

export type ConversationState = {
  conversations: Conversation[];
};

export type Conversation = {
  id: string;
  opener?: boolean;
  status: ChatBoxStatus;
  updatedAt: Date;
};
