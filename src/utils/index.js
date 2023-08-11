export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
};

export function isSuccess(response) {
  return new Promise((resolve, reject) =>
    response.status === Status.SUCCESS
      ? resolve(response.payload)
      : reject(response.payload)
  );
}

export function calculateScore(game) {
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
    (round) => round.winner.method?.toLowerCase() === "tie"
  ).length;
  score.ties = {
    name: "Ties",
    score: tieScore,
  };

  return score;
}
