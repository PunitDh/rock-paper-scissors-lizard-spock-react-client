import { Card } from "@mui/material";

const BlankCard = ({ children, className }) => (
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
