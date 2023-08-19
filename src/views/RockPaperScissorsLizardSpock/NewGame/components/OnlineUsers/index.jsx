import { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DashboardCard from "../../../../../components/shared/DashboardCard";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import StyledTableCell from "src/components/shared/StyledTableCell";
import UserRow from "./UserRow";
import { useGame } from "src/hooks";
import { useSelector } from "react-redux";

const OnlineUsers = ({ search }) => {
  const game = useGame();
  const { currentUsers } = useSelector((state) => state.player);

  useEffect(() => {
    game.getCurrentUsers();
  }, []);

  const currentUsersFiltered =
    search.length > 0
      ? currentUsers.filter((user) =>
          `${user.id} ${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : currentUsers;

  return (
    <DashboardCard title="Current Online Users">
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              {/* <ResponsiveTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </ResponsiveTableCell> */}
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <ResponsiveTableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  <Tooltip title="Win / loss ratio">
                    <span>W/L Ratio</span>
                  </Tooltip>
                </Typography>
              </ResponsiveTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ width: "100%" }}>
            {currentUsersFiltered?.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default OnlineUsers;
