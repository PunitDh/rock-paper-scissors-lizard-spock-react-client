import styled from "@emotion/styled";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const ResponsiveCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  height: "85vh",
  maxWidth: "90vw",
});

const GameCard = ({ title, children, action }) => {
  return (
    <ResponsiveCard elevation={9}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems={"center"}
          mb={3}
        >
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
          {action}
        </Stack>
      </CardContent>
      {children}
    </ResponsiveCard>
  );
};

export default GameCard;
