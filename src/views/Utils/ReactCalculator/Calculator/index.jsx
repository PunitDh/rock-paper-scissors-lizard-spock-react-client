import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import IOBox from "./IOBox";
import ButtonsBox from "./ButtonsBox";
import { useMediaQuery } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <DashboardCard sx={{ height: "100%" }} title="Calculator">
      <FlexBox
        flexDirection="column"
        gap="2rem"
        alignItems="flex-start"
        width={mdUp ? "45%" : "100%"}
      >
        <IOBox state={state} />
        <ButtonsBox state={state} dispatch={dispatch} />
      </FlexBox>
    </DashboardCard>
  );
};

export default Calculator;
