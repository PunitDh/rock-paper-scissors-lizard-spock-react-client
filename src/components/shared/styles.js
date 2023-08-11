const { default: styled } = require("@emotion/styled");
const { Box, Button, Tooltip } = require("@mui/material");

export const FlexBox = styled(Box)(
  ({ direction, wrap, justifyContent="center", alignItems="center", gap, height }) => ({
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent,
    alignItems,
    height,
    gap,
  })
);

export const TitledButton = ({ title, children, ...other }) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export const Bold = styled.div({
  fontWeight: "bold",
});
