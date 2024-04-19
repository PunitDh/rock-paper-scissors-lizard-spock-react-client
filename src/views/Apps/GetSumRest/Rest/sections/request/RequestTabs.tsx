import { Box, Tabs } from "@mui/material";
import { useState } from "react";
import QueryParamsTab from "./QueryParamsTab";
import AuthorizationTab from "./AuthorizationTab";
import Body from "./BodyTab";
import HeadersTab from "./HeadersTab";
import styled from "@emotion/styled";
import { RequestTabList, tabProps } from "../../constants";
import { DividerBox } from "../../styles";
import CustomTab from "../../components/CustomTab";
import { useQueryParam } from "../../../../../../hooks";
import { Dispatch } from "react";
import { Action, State } from "../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const WideBox = styled(Box)({
  width: "100%",
});

export default function RequestTabs({
  state,
  dispatch,
}: Props): JSX.Element {
  const requestTab = useQueryParam("requestTab");
  const [tab, setTab] = useState<number>(Number(requestTab) || 0);
  const handleChange = (_, newValue: number) => setTab(newValue);

  return (
    <WideBox>
      <DividerBox>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="rest-request-props"
        >
          {RequestTabList.map((tab, index) => (
            <CustomTab
              key={tab.type}
              label={tab.type}
              subLabel={() => tab.subLabel(state.request)}
              {...tabProps(index)}
            />
          ))}
        </Tabs>
      </DividerBox>
      <QueryParamsTab
        state={state}
        dispatch={dispatch}
        value={tab}
        tabId="request"
      />
      <AuthorizationTab
        state={state}
        dispatch={dispatch}
        value={tab}
        tabId="request"
      />
      <HeadersTab
        state={state}
        dispatch={dispatch}
        value={tab}
        tabId="request"
      />
      <Body state={state} dispatch={dispatch} value={tab} tabId="request" />
    </WideBox>
  );
}
