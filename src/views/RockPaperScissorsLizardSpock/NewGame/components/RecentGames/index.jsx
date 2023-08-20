import DashboardCard from "../../../../../components/shared/DashboardCard";
import { Timeline, timelineOppositeContentClasses } from "@mui/lab";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAPI } from "src/hooks";
import RecentGame from "./RecentGame";

const RecentGames = () => {
  const api = useAPI();
  const { recentGames } = useSelector((state) => state.player);

  useEffect(() => {
    api.getRecentGames();
  }, []);

  return (
    <DashboardCard title="Recent Games">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
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
          {recentGames.slice(0, 6).map((game) => (
            <RecentGame key={game.id} game={game} />
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentGames;
