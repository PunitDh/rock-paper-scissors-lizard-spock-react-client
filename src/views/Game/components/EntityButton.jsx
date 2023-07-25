import React from "react";

import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Entity = styled(Button)(({ btnColor }) => ({
  color: btnColor,
  // width: "8rem"
}));

const EntityButton = ({ children, btnColor, onMove }) => {
  return (
    <Entity
      onClick={() => onMove(children)}
      variant="outlined"
      btnColor={btnColor}
      title={`Play ${children}`}
    >
      {children}
    </Entity>
  );
};

export default EntityButton;
