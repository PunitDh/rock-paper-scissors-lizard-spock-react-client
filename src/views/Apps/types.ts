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
  rounds: string[];
  players: PlayerType[];
};

export type ChatType = {
  players: PlayerType[];
  id: string;
};

export type PlayerType = {
  id: string;
  firstName: string;
};
