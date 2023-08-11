import { Avatar, TableCell, Typography } from "@mui/material";
import React from "react";
import { avatars } from "src/data";

const PlayerNameHeaderCell = ({ player }) => {
  return (
    <TableCell>
      <Typography variant="subtitle2" fontWeight={600}>
        <Avatar
          src={avatars.find((avatar) => avatar.id === player.avatar).image}
        />
        {player.firstName}
      </Typography>
    </TableCell>
  );
};

export default PlayerNameHeaderCell;
