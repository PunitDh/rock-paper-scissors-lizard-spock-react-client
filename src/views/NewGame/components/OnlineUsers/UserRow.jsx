import { TableRow, Typography } from "@mui/material";
import React from "react";
import ResponsiveTableCell from "src/components/shared/ResponsiveTableCell";
import StyledTableCell from "src/components/shared/StyledTableCell";
import StartGameButton from "./StartGameButton";

const UserRow = ({ user }) => {
  return (
    <TableRow key={user.name}>
      <ResponsiveTableCell>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {user.id}
        </Typography>
      </ResponsiveTableCell>
      <StyledTableCell>{user.name}</StyledTableCell>
      <StyledTableCell>
        <StartGameButton user={user} />
      </StyledTableCell>
      <ResponsiveTableCell align="right">
        <Typography variant="h6">{user.wlRatio}</Typography>
      </ResponsiveTableCell>
    </TableRow>
  );
};

export default UserRow;
