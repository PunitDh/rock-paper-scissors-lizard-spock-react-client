import styled from "@emotion/styled";
import { CircularProgress, Tooltip } from "@mui/material";
import { Chat } from "@mui/icons-material";
import { useAPI, useSocket } from "src/hooks";
import { useState } from "react";
import { SocketResponse } from "src/utils/constants";

const GameButton = styled(Chat)(({ theme }) => ({
  backgroundColor: "primary.main",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));

export default function StartChat({ user }) {
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
