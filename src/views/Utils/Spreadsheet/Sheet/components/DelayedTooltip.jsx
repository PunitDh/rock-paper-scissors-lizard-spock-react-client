import { Tooltip } from "@mui/material";

const DelayedTooltip = ({ title, delay = 1000, children, ...others }) => {
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
