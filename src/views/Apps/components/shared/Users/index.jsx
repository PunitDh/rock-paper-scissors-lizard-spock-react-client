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
import UserRow from "./UserRow";
import { useSelector } from "react-redux";
import { useAPI, useLoading } from "../../../../../hooks";
import LoadingComponent from "../../../../../components/shared/LoadingComponent";
import ResponsiveTableCell from "../../../../../components/shared/ResponsiveTableCell";
import StyledTableCell from "../../../../../components/shared/StyledTableCell";

const Users = ({ search }) => {
  const { currentUsers } = useSelector((state) => state.player);
  const api = useAPI();
  const [getCurrentUsers, loading] = useLoading(api.getCurrentUsers);

  useEffect(() => {
    getCurrentUsers();
  }, []);

  const currentUsersFiltered =
    search.length > 0
      ? currentUsers.filter((user) =>
          `${user.id} ${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
      : currentUsers;

  return (
    <DashboardCard title="Users">
      <Box>
        {loading ? (
          <LoadingComponent />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
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
        )}
      </Box>
    </DashboardCard>
  );
};

export default Users;
