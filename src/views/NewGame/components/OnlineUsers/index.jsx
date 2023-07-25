import React from "react";
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

const users = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    wlRatio: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    wlRatio: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    wlRatio: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    wlRatio: "2.4",
  },
];

const OnlineUsers = ({ search }) => {
  const currentUsers =
    search.length > 0
      ? users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
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
            {currentUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default OnlineUsers;
