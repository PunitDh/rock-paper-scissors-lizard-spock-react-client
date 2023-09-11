import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import QueryParamsTab from "./QueryParamsTab";
import AuthorizationTab from "./AuthorizationTab";
import Body from "./BodyTab";
import HeadersTab from "./HeadersTab";

function a11yProps(index) {
  return {
    id: `header-tab-${index}`,
    "aria-controls": `rest-tabpanel-${index}`,
  };
}

export default function RequestTabs({ state, dispatch }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = Number(searchParams.get("activeTab"));
  const [value, setValue] = useState(activeTab || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Authorization" {...a11yProps(1)} />
          <Tab label="Headers" {...a11yProps(2)} />
          <Tab label="Body" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <QueryParamsTab state={state} dispatch={dispatch} value={value} />
      <AuthorizationTab state={state} dispatch={dispatch} value={value} />
      <HeadersTab state={state} dispatch={dispatch} value={value} />
      <Body state={state} dispatch={dispatch} value={value} />
    </Box>
  );
}
