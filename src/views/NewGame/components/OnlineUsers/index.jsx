import { useEffect, useState } from "react";
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
import { isSuccess } from "src/utils";

const OnlineUsers = ({ search }) => {
  const socket = useSocket();
  const token = useToken();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("get-current-users", { _jwt: token.jwt });
  }, [socket]);

  socket.on("current-users", (response) =>
    isSuccess(response).then(setUsers).catch(console.error)
  );

  const currentUsers =
    search.length > 0
      ? users.filter((user) =>
          `${user.id} ${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      : users;

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
            {currentUsers?.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default OnlineUsers;
