import { Button, Tooltip } from "@mui/material";

type Props = {
  title: string;
  children: React.ReactNode | string;
  [x: string]: any;
};

const TitledButton = ({ title, children, ...other }: Props) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export default TitledButton;
