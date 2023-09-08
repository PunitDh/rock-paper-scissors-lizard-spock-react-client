import { Tooltip } from "@mui/material";
import React from "react";
import { FieldButton } from "../../styles";

const FormattingButton = ({ onClick, title, isActive, Icon }) => (
  <Tooltip title={title}>
    <span>
      <FieldButton type="button" isactive={isActive} onClick={onClick}>
        <Icon style={{ width: "1rem" }} />
      </FieldButton>
    </span>
  </Tooltip>
);

export default FormattingButton;
