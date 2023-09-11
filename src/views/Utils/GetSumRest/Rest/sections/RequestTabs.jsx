import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import QueryParams from "./QueryParams";
import Authorization from "./Authorization";
import Headers from "./Headers";
import Body from "./Body";
import { useLocation } from "react-router";

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
      <QueryParams state={state} dispatch={dispatch} value={value} />
      <Authorization state={state} dispatch={dispatch} value={value} />
      <Headers state={state} dispatch={dispatch} value={value} />
      <Body state={state} dispatch={dispatch} value={value} />
    </Box>
  );
}
