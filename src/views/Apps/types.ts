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
};

type GameRound = {
  moves: string[];
  winner: {
    playerId: string;
    name: string;
    method: string;
    reason: string;
  }
}

export type ChatType = {
  players: PlayerType[];
  id: string;
};

export type PlayerType = {
  id: string;
  firstName: string;
};
