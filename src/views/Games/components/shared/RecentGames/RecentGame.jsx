import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Bold } from "src/components/shared/styles";
import { useCurrentGame } from "src/hooks";
import { formatDate } from "src/utils";

const RecentGame = ({ game }) => {
  const currentGame = useCurrentGame(game);

  const playerScores = Object.values(currentGame.score)
    .map((player) => `${player.name}: ${player.score}`)
    .join(", ");

  const rounds = currentGame.rounds.filter((it) => it.moves.length > 0).length;

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        {formatDate(currentGame.updatedAt)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary" variant="outlined" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <div>
          {currentGame.players
            .map((player) => player.firstName)
            .join(` played ${rounds} round${rounds !== 1 ? "s" : ""} with `)}
        </div>
        <div>
          <Bold>{playerScores}</Bold>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default RecentGame;
