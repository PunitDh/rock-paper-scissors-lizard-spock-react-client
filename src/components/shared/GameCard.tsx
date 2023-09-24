import { Box, CardContent, Stack, Typography } from "@mui/material";
import { ResponsiveCard } from "./styles";

type Props = {
  title: string;
  children: JSX.Element | string;
  action: JSX.Element | string | undefined;
}

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
