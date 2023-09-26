import { NavItemType } from "../layouts/FullLayout/Sidebar/types";
import { PlayerType } from "../views/Apps/types";
import { ChatBoxStatus } from "../views/ChatBar/constants";

export const CURRENT_GAMES = "Current Games" as const;

export type PlayerState = {
  token: string | null;
  currentGame: { [key: string]: any };
  currentUsers: { [key: string]: any }[];
  currentGames: { [key: string]: any }[];
  recentGames: { [key: string]: any }[];
};

export type NavGroupType = {
  maximized: boolean;
  items: NavItemType[];
};

export type MenuState = {
  Admin: NavGroupType;
  Home: NavGroupType;
  Games: NavGroupType;
  Apps: NavGroupType;
  Messages: NavGroupType;
  [CURRENT_GAMES]: NavGroupType;
  Settings: NavGroupType;
};

export type ConversationState = {
  conversations: Conversation[];
};

export type Conversation = {
  id: string;
  opener?: boolean;
  messages: Message[];
  players: PlayerType[];
  status: ChatBoxStatus;
  updatedAt: Date;
};

export type Message = {
  _id: string;
  content: string;
  sender: string;
  read: boolean;
  createdAt: Date;
};
