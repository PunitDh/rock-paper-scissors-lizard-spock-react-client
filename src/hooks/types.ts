import { Status } from "../utils/constants";

export type Clipboard = {
  get: () => Promise<string | undefined>;
  copy: (text: string) => Promise<boolean | void>;
};

export type PlayerRegistration = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type PlayerLogin = {
  email: string;
  password: string;
  remember: boolean;
};

export type Data = {
  payload: any;
  status: Status;
  code: number;
};

export type GameData = {
  game: "rpsls";
  opponent: string;
  icon: number;
}

export type LogRequest = {
  limit: number;
  type: string;
  time: number;
}

export interface API {
  registerPlayer: (playerRegistration: PlayerRegistration) => void;

  loginPlayer: (formData: PlayerLogin) => void;

  getSiteSettings: () => void;

  getConversations: () => void;

  createGame: (gameData: GameData) => void;

  getCurrentGames: () => void;

  getRecentGames: (limit: number) => void;

  getCurrentUsers: () => void;

  getGame: (gameId: string) => void;

  getLogs: ({ limit, type, time }: LogRequest) => void;

  clearLogs: () => void;

  translateSubtitles: (formData, sessionId) => void;

  getDownloadFile: (location: string) => Promise<any>;

  sendRestRequest: (config) => Promise<void>;

  sendProxyRestRequest: (data) => Promise<void>;

  setSiteSettings: (request) => void;

  renameGame: (request) => void;

  deleteGame: (request) => void;

  playMove: (request) => void;

  resetGameRounds: (request) => void;

  changeGameIcon: (request) => void;

  logoutPlayer: () => void;

  sendMessage: (request) => void;

  updateProfile: (request) => void;

  updatePassword: (request) => void;

  deleteProfile: (request) => void;

  startChat: (request) => void;

  joinChats: () => void;

  joinChat: (request) => void;

  markConversationAsRead: (request) => void;

  requestProgressUpdate: (request) => void;
}

export type Token = {
  jwt?: string;
  decoded?: Decoded | undefined;
  set: (token: string) => void;
  clear: () => void;
};

export type Decoded = {
  avatar: number;
  email: string;
  exp: number;
  firstName: string;
  hidden: boolean;
  iat: number;
  id: string;
  isAdmin: boolean;
  isOnline: boolean;
  lastName: string;
  losses: number;
  wins: number;
};
