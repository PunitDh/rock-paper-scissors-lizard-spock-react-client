import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import IOBox from "./sections/IOBox";
import ButtonsBox from "./sections/ButtonsBox";
import { Typography, useMediaQuery } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <DashboardCard sx={{ height: "100%" }} title="Calculator">
      <FlexBox
        justifyContent="flex-start"
        flexDirection={mdUp ? "row" : "column"}
        alignItems="flex-start"
        gap="2rem"
      >
        <FlexBox
          flexDirection="column"
          gap="2rem"
          alignItems="flex-start"
          width={mdUp ? "50%" : "100%"}
        >
          <IOBox state={state} />
          <ButtonsBox state={state} dispatch={dispatch} />
        </FlexBox>
        <FlexBox
          gap="0.5rem"
          alignItems="flex-start"
          justifyContent="flex-end"
          width={mdUp ? "50%" : "100%"}
        >
          <FlexBox
            flexDirection="column"
            gap="0.5rem"
            alignItems="flex-start"
            justifyContent="flex-end"
            width={mdUp ? "50%" : "100%"}
          >
            <Typography textAlign="right" width="100%" variant="h5">
              History
            </Typography>
            {state.history.map((history, idx) => (
              <Typography
                key={idx}
                component="span"
                textAlign="right"
                width="100%"
              >
                {history.input.join("")} = {history.output}
              </Typography>
            ))}
          </FlexBox>
          <FlexBox
            flexDirection="column"
            gap="0.5rem"
            alignItems="flex-start"
            justifyContent="flex-end"
            width={mdUp ? "50%" : "100%"}
          >
            <Typography textAlign="right" width="100%" variant="h5">
              Memory
            </Typography>
            {Object.entries(state.memory).map(([address, memory]) => (
              <Typography
                key={address}
                component="span"
                textAlign="right"
                width="100%"
              >
                {address} = {memory.value}
              </Typography>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </DashboardCard>
  );
};

export default Calculator;
