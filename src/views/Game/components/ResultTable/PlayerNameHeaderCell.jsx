import styled from "@emotion/styled";
import { Avatar, TableCell, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "src/components/shared/styles";
import { avatars } from "src/data";

const Score = styled(FlexBox)(({ theme }) => ({
  fontSize: "large",
  color: "white",
  backgroundColor: theme.palette.primary.dark,
  width: "2rem",
  height: "2rem",
  borderRadius: "1rem",
}));

const PlayerNameHeaderCell = ({ player, score }) => {
  if (!player) return null;
  const avatar = avatars.find((avatar) => avatar.id === player.avatar).image;
  return (
    <TableCell>
      <Typography variant="subtitle2" fontWeight={600}>
        <FlexBox justifyContent="flex-start" gap="0.5rem">
          <FlexBox flexDirection="column">
            <Avatar src={avatar} />
            {player.firstName}
          </FlexBox>
          <FlexBox>
            <Score>{score}</Score>
          </FlexBox>
        </FlexBox>
      </Typography>
    </TableCell>
  );
};

export default PlayerNameHeaderCell;
