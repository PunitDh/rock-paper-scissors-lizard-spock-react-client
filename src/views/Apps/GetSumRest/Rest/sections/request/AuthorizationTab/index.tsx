import CustomTabPanel from "../../../components/CustomTabPanel";
import styled from "@emotion/styled";
import Selector from "./Selector";
import { AuthorizationTypeItems } from "../../../constants";
import { Bold } from "../../../../../../../components/shared/styles";
import FlexBox from "../../../../../../../components/shared/FlexBox";
import { Action, State } from "../../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: number;
  tabId: string;
};

type StyledBoxProps = {
  border?: boolean;
  width?: string;
};

const StyledBox = styled.div(({ border, width }: StyledBoxProps) => ({
  borderRight: border ? "1px solid rgba(0,0,0,0.1)" : 0,
  height: "15rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  display: "flex",
  width: width || "60%",
  flexDirection: "column",
  gap: "0.5rem",
}));

const AuthorizationTab = ({ state, dispatch, value, tabId }: Props): React.ReactNode => {
  const { Component } =
    AuthorizationTypeItems[state.request.authorization.type];

  return (
    <CustomTabPanel value={value} index={1} tabId={tabId}>
      <Bold>Authorization</Bold>
      <FlexBox
        width="100%"
        height="100%"
        gap="1rem"
        justifyContent="flex-start"
        marginTop="1rem"
      >
        <StyledBox border>
          <Selector state={state} dispatch={dispatch} />
        </StyledBox>
        <StyledBox width="100%">
          {Component && <Component state={state} dispatch={dispatch} />}
        </StyledBox>
      </FlexBox>
    </CustomTabPanel>
  );
};

export default AuthorizationTab;
