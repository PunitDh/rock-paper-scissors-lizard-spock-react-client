import { useSelector } from "react-redux";
import { GameScore, GameType } from "../views/Apps/types";

function calculateScore(game: GameType): GameScore {
  const score: GameScore = {};

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

export default function useCurrentGame(game?: GameType): GameType & GameScore {
  const { currentGame } = useSelector((state) => (state as any).player);

  return game
    ? { ...game, score: calculateScore(game) as GameScore }
    : { ...currentGame, score: calculateScore(currentGame) as GameScore };
}
