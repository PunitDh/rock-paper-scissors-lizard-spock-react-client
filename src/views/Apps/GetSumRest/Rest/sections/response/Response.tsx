import { Tabs } from "@mui/material";
import BodyOutput from "./BodyOutput";
import { DividerBox } from "../../styles";
import { useState } from "react";
import { ResponseTabList, tabProps } from "../../constants";
import CustomTabPanel from "../../components/CustomTabPanel";
import Cookies from "./Cookies";
import Header from "./Headers";
import ResponseStatus from "./ResponseStatus";
import CustomTab from "../../components/CustomTab";
import { useQueryParam } from "../../../../../../hooks";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { Action, State } from "../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const Response = ({ state, dispatch }: Props): React.ReactNode => {
  const responseTab = useQueryParam("responseTab");
  const [tab, setTab] = useState(Number(responseTab) || 0);
  const handleChange = (_, newValue: number) => setTab(newValue);

  return (
    <FlexBox
      flexDirection="column"
      width="95%"
      alignItems="flex-start"
      margin="auto"
      flexGrow={1}
    >
      <FlexBox justifyContent="space-between" width="100%">
        <DividerBox>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="rest-request-props"
          >
            {ResponseTabList.map((tab, index) => (
              <CustomTab
                key={tab.type}
                label={tab.type}
                subLabel={() => tab.subLabel(state.response)}
                {...tabProps(index)}
              />
            ))}
          </Tabs>
        </DividerBox>
        <ResponseStatus state={state} />
      </FlexBox>
      <CustomTabPanel
        tabId="response"
        value={tab}
        index={0}
        style={{ width: "100%" }}
      >
        <BodyOutput state={state} dispatch={dispatch} />
      </CustomTabPanel>
      <CustomTabPanel
        tabId="response"
        value={tab}
        index={1}
        style={{ width: "100%" }}
      >
        <Cookies state={state} />
      </CustomTabPanel>
      <CustomTabPanel
        tabId="response"
        value={tab}
        index={2}
        style={{ width: "100%" }}
      >
        <Header state={state} />
      </CustomTabPanel>
    </FlexBox>
  );
};

export default Response;
