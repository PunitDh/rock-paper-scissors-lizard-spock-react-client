const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

export const FlexBox = styled(Box)(
  ({ direction, wrap, justifyContent, alignItems, gap }) => ({
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent,
    alignItems,
    gap
  })
);
