import DashboardCard from "../../../../../components/shared/DashboardCard";
import { Timeline, timelineOppositeContentClasses } from "@mui/lab";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RecentGame from "./RecentGame";
import { useAPI, useLoading } from "../../../../../hooks";
import LoadingComponent from "../../../../../components/shared/LoadingComponent";

const RecentGames = (): React.ReactNode => {
  const api = useAPI();
  const { recentGames } = useSelector((state) => (state as any).player);
  const [getRecentGames, loading] = useLoading(api.getRecentGames);
  const limit = 6;

  useEffect(() => {
    getRecentGames(limit);
  }, []);

  return (
    <DashboardCard title="Recent Games">
      {loading ? (
        <LoadingComponent />
      ) : (
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
          {recentGames.map((game) => (
            <RecentGame key={game.id} game={game} />
          ))}
        </Timeline>
      )}
    </DashboardCard>
  );
};

export default RecentGames;
