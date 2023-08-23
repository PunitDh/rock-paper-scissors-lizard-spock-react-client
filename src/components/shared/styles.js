import styled from "@emotion/styled";
import { Box, Button, Card, TextField, Tooltip } from "@mui/material";

export const FlexBox = ({
  children,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  flexWrap,
  flexGrow,
  height,
  width,
  ...styles
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent,
      alignItems,
      flexWrap,
      flexDirection,
      flexGrow,
      height,
      width,
      ...styles,
    }}
  >
    {children}
  </Box>
);

export const TitledButton = ({ title, children, ...other }) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export const ResponsiveCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "85dvh",
  maxWidth: "90dvw",
});

export const Bold = styled.span({
  fontWeight: "bold",
});

export const WideTextField = styled(TextField)({
  width: "100%",
});
