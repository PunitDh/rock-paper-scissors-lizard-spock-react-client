import styled from "@emotion/styled";
import { Avatar, TableCell, Tooltip, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "src/components/shared/styles";
import { getAvatar } from "src/data";
import { useConversation, useToken } from "src/hooks";

const Score = styled(FlexBox)(({ theme }) => ({
  fontSize: "large",
  color: "white",
  backgroundColor: theme.palette.primary.dark,
  width: "2rem",
  height: "2rem",
  borderRadius: "1rem",
}));

const InGameAvatar = styled(Avatar)({
  cursor: "pointer",
});

const PlayerNameHeaderCell = ({ player, score }) => {
  const conversation = useConversation();
  const token = useToken();
  if (!player) return null;

  const handleStartChat = () => conversation.start({ player: player.id });

  const avatar = getAvatar(player.avatar);
  return (
    <TableCell>
      <Typography variant="subtitle2" fontWeight={600}>
        <FlexBox justifyContent="flex-start" gap="0.5rem">
          <FlexBox flexDirection="column">
            {player.id !== token.decoded.id ? (
              <Tooltip title={`Chat with ${player.firstName}`}>
                <InGameAvatar src={avatar} onClick={handleStartChat} />
              </Tooltip>
            ) : (
              <Avatar src={avatar} />
            )}
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
