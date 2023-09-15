import { CircularProgress } from "@mui/material";
import FlexBox from "./FlexBox";

const LoadingComponent = () => {
  return (
    <FlexBox width="100%" height="100%">
      <CircularProgress />
    </FlexBox>
  );
};

export default LoadingComponent;
