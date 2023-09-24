import { useSelector } from "react-redux";

function calculateScore(game) {
  const score = {};

  game.players?.forEach((player) => {
    const { id: playerId } = player;
    score[playerId] = {
      name: player.firstName,
      score: game.rounds?.filter((round) => round.winner.playerId === playerId)
        .length,
    };
  });

  const tieScore = game.rounds?.filter(
    (round) => round.winner.method?.toLowerCase() === "tie",
  ).length;
  score.ties = {
    name: "Ties",
    score: tieScore,
  };

  return score;
}

export default function useCurrentGame(game) {
  const { currentGame } = useSelector((state) => state.player);

  return game
    ? { ...game, score: calculateScore(game) }
    : { ...currentGame, score: calculateScore(currentGame) };
}
