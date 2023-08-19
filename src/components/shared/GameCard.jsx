import { Box, CardContent, Stack, Typography } from "@mui/material";
import { ResponsiveCard } from "./styles";

const GameCard = ({ title, children, action }) => (
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
