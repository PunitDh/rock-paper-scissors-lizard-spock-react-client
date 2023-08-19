import { CircularProgress } from "@mui/material";
import React from "react";
import { FlexBox } from "./styles";

const LoadingScreen = () => {
  return (
    <FlexBox width="100%" height="100dvh">
      <CircularProgress />
    </FlexBox>
  );
};

export default LoadingScreen;
