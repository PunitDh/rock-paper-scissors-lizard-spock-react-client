import React from "react";

import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useSocket } from "src/hooks/useSocket";

const Entity = styled(Button)(({ btncolor }) => ({
  color: btncolor,
  // width: "8rem"
}));

const EntityButton = ({ children, btncolor, onMove }) => {
  const socket = useSocket();

  const handleMove = () => {
    if (socket) {
      socket.emit("play-move", children);
    }
  };

  if (socket) {
    socket.on("move-played", (...args) => {
      console.log(...args);
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
