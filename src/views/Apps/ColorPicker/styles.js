import styled from "@emotion/styled";
import FlexBox from "../../../components/shared/FlexBox";

export const ResponsiveFlexBox = styled(FlexBox)(({ theme, reversed }) => ({
  alignItems: reversed ? "flex-start" : "center",
  [theme.breakpoints.up("lg")]: {
    alignItems: reversed ? "center" : "flex-start",
  },
}));
