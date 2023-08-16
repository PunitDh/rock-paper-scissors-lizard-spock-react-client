const { default: styled } = require("@emotion/styled");
const { Box, Button, Tooltip } = require("@mui/material");

export const FlexBox = styled(Box)(
  ({ direction, wrap, justifyContent="center", alignItems="center", gap, height, width, justifySelf, alignSelf }) => ({
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent,
    alignItems,
    height,
    width,
    gap,
    justifySelf,
    alignSelf
  })
);

export const TitledButton = ({ title, children, ...other }) => (
  <Tooltip title={title}>
    <Button {...other}>{children}</Button>
  </Tooltip>
);

export const Bold = styled.span({
  fontWeight: "bold",
});
