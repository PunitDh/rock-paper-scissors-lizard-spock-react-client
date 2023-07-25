import React from "react";

import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useSocket } from "src/hooks/useSocket";
import { useToken } from "src/hooks/useToken";

const Entity = styled(Button)(({ btncolor }) => ({
  color: btncolor,
}));

const EntityButton = ({ children, btncolor, gameId }) => {
  const socket = useSocket();
  const token = useToken();

  const handleMove = () => {
    const payload = {
      playerId: token.decoded.id,
      move: children,
      gameId,
    };
    if (socket) {
      socket.emit("play-move", payload);
    }
  };

  if (socket) {
    socket.on("move-played", (payload) => {
      console.log(payload);
    });
  }

  return (
    <Entity
      onClick={handleMove}
      variant="outlined"
      btncolor={btncolor}
      title={`Play ${children}`}
    >
      {children}
    </Entity>
  );
};

export default EntityButton;
