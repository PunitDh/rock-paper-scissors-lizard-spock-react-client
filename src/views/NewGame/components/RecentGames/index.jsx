import DashboardCard from "../../../../components/shared/DashboardCard";
import { Timeline, timelineOppositeContentClasses } from "@mui/lab";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGame } from "src/hooks";
import RecentGame from "./RecentGame";

const RecentTransactions = () => {
  const game = useGame();
  const { recentGames } = useSelector((state) => state.game);

  useEffect(() => {
    game.getRecentGames();
  }, []);

  return (
    <DashboardCard title="Recent Games">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {recentGames.map((game) => (
            <RecentGame key={game.id} game={game} />
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
