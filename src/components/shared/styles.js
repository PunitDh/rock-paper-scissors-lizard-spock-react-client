const { default: styled } = require("@emotion/styled");
const { Box, Button, Tooltip } = require("@mui/material");

export const FlexBox = styled(Box)(
  ({ direction, wrap, justifyContent, alignItems, gap }) => ({
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent,
    alignItems,
    gap,
  })
);

export const TitledButton = ({ title, children, ...other }) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);
