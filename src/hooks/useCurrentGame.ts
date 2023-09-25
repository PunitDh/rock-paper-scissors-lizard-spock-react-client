import { useSelector } from "react-redux";
import { GameType } from "../views/Apps/types";
import { Score } from "./types";

function calculateScore(game: GameType): Score {
  const score: Score = {};

  game.players?.forEach((player) => {
    const { id: playerId } = player;
    score[playerId] = {
      name: player.firstName,
      score: game.rounds?.filter((round) => round.winner.playerId === playerId)
        .length,
    };
  });

  const tieScore = game.rounds?.filter(
    (round) => round.winner.method?.toLowerCase() === "tie"
  ).length;
  score.ties = {
    name: "Ties",
    score: tieScore,
  };

  return score;
}

export default function useCurrentGame(game?: GameType): GameType & Score {
  const { currentGame } = useSelector((state) => (state as any).player);

  return game
    ? { ...game, score: calculateScore(game) }
    : { ...currentGame, score: calculateScore(currentGame) };
}
