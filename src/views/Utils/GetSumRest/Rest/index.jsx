import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import { useMediaQuery } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import URLBar from "./sections/request/URLBar";
import RequestTabs from "./sections/request/RequestTabs";
import Response from "./sections/response/Response";
import { initializeState } from "./utils";
import { useToken } from "src/hooks";

const Rest = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const token = useToken();

  return (
    <DashboardCard sx={{ height: "100%" }} title="Rest API">
      <FlexBox
        justifyContent="flex-start"
        flexDirection={"column"}
        alignItems="flex-start"
        gap="2rem"
        width="100%"
      >
        {token.decoded.isAdmin && (
          <button type="button" onClick={() => console.log(state)}>
            Show State
          </button>
        )}
        <URLBar state={state} dispatch={dispatch} />
        <RequestTabs state={state} dispatch={dispatch} />
        <Response state={state} dispatch={dispatch} />
      </FlexBox>
    </DashboardCard>
  );
};

export default Rest;
