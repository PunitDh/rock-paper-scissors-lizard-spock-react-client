import React from "react";
import { SvgIconProps, SvgIconTypeMap, Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Props = {
  onClick: (e: React.MouseEvent) => void;
  title: string;
  isActive: boolean;
  Icon?: ((props: SvgIconProps) => JSX.Element) | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; });
  children?: any;
}

const FormattingButton = ({ onClick, title, isActive, Icon, children }: Props) => (
  <Tooltip title={title}>
    <span>
      <FieldButton type="button" isactive={isActive} onClick={onClick}>
        {Icon ? <Icon style={{ width: "1rem" }} /> : children}
      </FieldButton>
    </span>
  </Tooltip>
);

export default FormattingButton;
