import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { useCurrentGame } from "../../../../../hooks";
import { formatDate } from "../../../../../utils";
import { Bold } from "../../../../../components/shared/styles";
import { GameType } from "../../../types";

type Props = {
  game: GameType;
};

const RecentGame = ({ game }: Props) => {
  const currentGame = useCurrentGame(game);

  const playerScores = Object.values(currentGame.score)
    .map((player) => `${(player as any).name}: ${(player as any).score}`)
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
