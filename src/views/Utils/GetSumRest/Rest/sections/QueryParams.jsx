import React from "react";
import CustomTabPanel from "../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../components/KeyValueComponent";

export default function QueryParams({ state, dispatch, value }) {
  return (
    <CustomTabPanel value={value} index={0}>
      <Bold>Query Params</Bold>
      <KeyValueComponent state={state} dispatch={dispatch} />
    </CustomTabPanel>
  );
}
