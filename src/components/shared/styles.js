import styled from "@emotion/styled";
import { Box, Button, Tooltip } from "@mui/material";

export const FlexBox = ({
  children,
  justifyContent = "center",
  alignItems = "center",
  ...styles
}) => (
  <Box sx={{ display: "flex", justifyContent, alignItems, ...styles }}>
    {children}
  </Box>
);

export const TitledButton = ({ title, children, ...other }) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export const Bold = styled.span({
  fontWeight: "bold",
});
