import React from "react";
import CustomTabPanel from "../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../components/KeyValueComponent";

export default function Headers({ state, dispatch, value }) {
  return (
    <CustomTabPanel value={value} index={2}>
      <Bold>Headers</Bold>
      <KeyValueComponent state={state} dispatch={dispatch} />
    </CustomTabPanel>
  );
}
