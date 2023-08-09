import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import React from "react";
import { calculateScore } from "src/utils";

const RecentGame = ({ game }) => {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-AU", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Australia/Sydney",
    }).format(new Date(date));

  const score = calculateScore(game);

  const playerScores = Object.entries(score)
    .map(([player, score]) => `${player}: ${score}`)
    .join(", ");

  const rounds = game.rounds.filter((it) => it.moves.length > 0).length;

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        {formatDate(game.updatedAt)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" variant="outlined" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <div>
          {game.players
            .map((player) => player.firstName)
            .join(` played ${rounds} round${rounds !== 1 ? "s" : ""} with `)}
        </div>
        <div>
          <strong>Score:</strong> {playerScores}
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default RecentGame;
