import { Box, Tabs } from "@mui/material";
import { useState } from "react";
import QueryParamsTab from "./QueryParamsTab";
import AuthorizationTab from "./AuthorizationTab";
import Body from "./BodyTab";
import HeadersTab from "./HeadersTab";
import styled from "@emotion/styled";
import { RequestTabList, tabProps } from "../../constants";
import { DividerBox } from "../../styles";
import { useQueryParam } from "src/hooks";
import CustomTab from "../../components/CustomTab";

const WideBox = styled(Box)({
  width: "100%",
});

export default function RequestTabs({ state, dispatch }) {
  const requestTab = useQueryParam("requestTab");
  const [tab, setTab] = useState(Number(requestTab) || 0);
  const handleChange = (_, newValue) => setTab(newValue);

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
