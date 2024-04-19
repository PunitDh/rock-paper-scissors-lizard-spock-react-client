import { Tooltip } from "@mui/material";

type Props = {
  title: string;
  delay: number;
  children: any;
  others?: { [key: string]: string };
};

const DelayedTooltip = ({
  title,
  delay = 1000,
  children,
  ...others
}: Props): JSX.Element => (
  <Tooltip title={title} enterDelay={delay} enterNextDelay={delay} {...others}>
    {children}
  </Tooltip>
);

export default DelayedTooltip;
