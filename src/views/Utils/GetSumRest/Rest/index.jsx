import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { initialState, reducer } from "./reducer";
import { useMediaQuery } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setLoading } from "../../VideoConverter/Convert/actions";
import URLBar from "./sections/URLBar";
import RequestTabs from "./sections/RequestTabs";

const Rest = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setTimeout(() => dispatch(setLoading(false)), 4000);
  };

  return (
    <DashboardCard sx={{ height: "100%" }} title="Rest API">
      <form onSubmit={handleSubmit}>
        <FlexBox
          justifyContent="flex-start"
          flexDirection={"column"}
          alignItems="flex-start"
          gap="2rem"
          width="100%"
        >
          <URLBar state={state} dispatch={dispatch} />
          <RequestTabs state={state} dispatch={dispatch} />
        </FlexBox>
      </form>
    </DashboardCard>
  );
};

export default Rest;
