import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AuthBox = styled(Box)({
  position: "relative",
  "&:before": {
    content: '""',
    background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0.3",
  },
});
