import { Card } from "@mui/material";

type Props = {
  className?: string;
  children: JSX.Element[];
}

const BlankCard = ({ children, className }: Props) => (
  <Card
    sx={{ p: 0, position: "relative" }}
    className={className}
    elevation={9}
    variant={undefined}
  >
    {children}
  </Card>
);

export default BlankCard;
