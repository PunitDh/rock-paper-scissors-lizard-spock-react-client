import CustomTabPanel from "../../../components/CustomTabPanel";
import { Bold, FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";
import { AuthorizationTypeMenuItems } from "./constants";
import Selector from "./Selector";

const StyledBox = styled.div(({ border, width }) => ({
  borderRight: border ? "1px solid rgba(0,0,0,0.1)" : 0,
  height: "15rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  display: "flex",
  width: width || "40%",
  flexDirection: "column",
  gap: "0.5rem",
}));

const AuthorizationTab = ({ state, dispatch, value }) => {
  const { Component } =
    AuthorizationTypeMenuItems[state.request.authorization.type];

  return (
    <CustomTabPanel value={value} index={1}>
      <Bold>Authorization</Bold>
      <FlexBox
        width="100%"
        gap="1rem"
        justifyContent="flex-start"
        marginTop="1rem"
      >
        <StyledBox border>
          <Selector state={state} dispatch={dispatch} />
        </StyledBox>
        <StyledBox width="60%" height="">
          {Component && <Component state={state} dispatch={dispatch} />}
        </StyledBox>
      </FlexBox>
    </CustomTabPanel>
  );
};

export default AuthorizationTab;
