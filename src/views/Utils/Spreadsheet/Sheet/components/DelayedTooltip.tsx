import React from "react";
import { Tooltip } from "@mui/material";

type DelayedTooltipProps = {
  title: string
  delay: number
  children: any
  others?: { [key: string]: string }
}

const DelayedTooltip = ({ title, delay = 1000, children, ...others }: DelayedTooltipProps) => {
  return (
    <Tooltip
      title={title}
      enterDelay={delay}
      enterNextDelay={delay}
      {...others}
    >
      {children}
    </Tooltip>
  );
};

export default DelayedTooltip;
