import { ProjectIcon } from "../../layouts/FullLayout/Sidebar/types";

export type LinkCardProps = {
  id: string;
  to: string;
  Icon: any;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export type GameType = {
  id: string;
  name: string;
  icon: number;
  rounds: GameRound[];
  players: PlayerType[];
  updatedAt: Date;
};

export type GameRound = {
  id: string;
  moves: GameMove[];
  winner: GameWinner;
}

export type GameMove = {
  id: string;
  player: string;
  move: string;
}

export type GameScore = {
  [key: string]: {
    name: string;
    score: number;
  };
};

export type GameWinner = {
  playerId: string;
  firstName: string;
  method: string;
  reason: string;
}

export type ChatType = {
  players: PlayerType[];
  id: string;
};

export type PlayerType = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: number;
  isOnline: boolean;
  hidden: boolean;
  wins: number;
  losses: number;
};
