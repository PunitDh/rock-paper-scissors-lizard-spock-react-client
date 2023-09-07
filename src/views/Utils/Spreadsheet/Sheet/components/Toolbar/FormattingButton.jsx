import { Tooltip } from "@mui/material";
import React from "react";
import { FieldButton } from "../styles";

const FormattingToggleButton = ({ onClick, title, isActive, children }) => (
  <Tooltip title={title}>
    <span>
      <FieldButton type="button" isactive={isActive} onClick={onClick}>
        {children}
      </FieldButton>
    </span>
  </Tooltip>
);

export default FormattingToggleButton;
