import { CircularProgress } from "@mui/material";
import FlexBox from "./FlexBox";

const LoadingScreen = () => (
  <FlexBox width="100%" height="100dvh">
    <CircularProgress />
  </FlexBox>
);

export default LoadingScreen;
