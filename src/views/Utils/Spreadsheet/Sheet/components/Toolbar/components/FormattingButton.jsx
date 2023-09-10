import { Tooltip } from "@mui/material";
import React from "react";
import { FieldButton } from "../../styles";

const FormattingButton = ({ onClick, title, isActive, Icon, children }) => (
  <Tooltip title={title}>
    <span>
      <FieldButton type="button" isactive={isActive} onClick={onClick}>
        {Icon ? <Icon style={{ width: "1rem" }} /> : children}
      </FieldButton>
    </span>
  </Tooltip>
);

export default FormattingButton;
