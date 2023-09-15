import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { useMediaQuery } from "@mui/material";
import URLBar from "./sections/request/URLBar";
import RequestTabs from "./sections/request/RequestTabs";
import Response from "./sections/response/Response";
import { initializeState } from "./utils";
import RequestName from "./sections/request/RequestName";
import { useToken } from "../../../../hooks";
import DashboardCard from "../../../../components/shared/DashboardCard";
import FlexBox from "../../../../components/shared/FlexBox";

const Rest = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const token = useToken();

  return (
    <DashboardCard sx={{ height: "100%" }} title="Get Sum Rest">
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
        <RequestName state={state} dispatch={dispatch} />
        <URLBar state={state} dispatch={dispatch} />
        <RequestTabs state={state} dispatch={dispatch} />
        <Response state={state} dispatch={dispatch} />
      </FlexBox>
    </DashboardCard>
  );
};

export default Rest;
