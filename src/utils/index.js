export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
};

export function isSuccess(response) {
  return new Promise((resolve, reject) => {
    return response.status === Status.SUCCESS
      ? resolve(response.payload)
      : reject(response.payload);
  });
}

export function calculateScore(game) {
  const score = {};

  game.players.forEach((player) => {
    score[player.firstName] = game.rounds.filter(
      (round) => round.winner.playerId === player.id
    ).length;
  });

  score.Ties = game.rounds.filter(
    (round) => round.winner.method?.toLowerCase() === "tie"
  ).length;

  return score;
}
