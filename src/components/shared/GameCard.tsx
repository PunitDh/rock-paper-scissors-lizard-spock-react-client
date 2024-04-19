import { Box, CardContent, Stack, Typography } from "@mui/material";
import { ResponsiveCard } from "./styles";

type Props = {
  title: React.ReactNode | string;
  children: any;
  action: React.ReactNode | string | undefined;
};

const GameCard = ({ title, children, action }: Props) => (
  <ResponsiveCard elevation={9}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5">{title}</Typography>
        </Box>
        {action}
      </Stack>
    </CardContent>
    {children}
  </ResponsiveCard>
);

export default GameCard;
