import styled from "@emotion/styled";
import { CircularProgress, Tooltip } from "@mui/material";
import { Chat } from "@mui/icons-material";
import { useState } from "react";
import { useAPI, useSocket } from "../../../../../hooks";
import { SocketResponse } from "../../../../../utils/constants";
import { PlayerType } from "../../../types";

type Props = {
  user: PlayerType;
}

const GameButton = styled(Chat)(({ theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export default function StartChat({ user }: Props): React.ReactNode {
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const api = useAPI();

  const handleStartChat = () => {
    setLoading(true);
    socket.on(SocketResponse.START_CONVERSATION, () => setLoading(false));
    api.startChat({ player: user.id });
  };

  return (
    <Tooltip title={`Chat with ${user.firstName}`}>
      {loading ? (
        <CircularProgress size="1.25rem" />
      ) : (
        <GameButton onClick={handleStartChat} />
      )}
    </Tooltip>
  );
}
