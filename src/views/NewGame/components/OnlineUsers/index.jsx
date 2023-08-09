import { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardCard from "../../../../components/shared/DashboardCard";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import StyledTableCell from "src/components/shared/StyledTableCell";
import UserRow from "./UserRow";
import { useSocket, useToken } from "src/hooks";
import { useSelector } from "react-redux";
import { SocketRequest } from "src/utils/constants";

const OnlineUsers = ({ search }) => {
  const socket = useSocket();
  const token = useToken();
  const { currentUsers } = useSelector((state) => state.game);

  useEffect(() => {
    socket.emit(SocketRequest.LOAD_CURRENT_USERS, { _jwt: token.jwt });
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
              <ResponsiveTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </ResponsiveTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <ResponsiveTableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  W/L Ratio
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
