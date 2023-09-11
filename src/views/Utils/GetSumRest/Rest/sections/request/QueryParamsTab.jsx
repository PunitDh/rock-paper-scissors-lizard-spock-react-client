import React from "react";
import CustomTabPanel from "../../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../../components/KeyValueComponent";
import { setParams } from "../../actions";

export default function QueryParamsTab({ state, dispatch, value }) {
  const handleChange = (e) => {
    console.log(e);
    dispatch(setParams(e));
  };

  return (
    <CustomTabPanel value={value} index={0}>
      <Bold>Query Params</Bold>
      <KeyValueComponent property={state.params} onChange={handleChange} />
    </CustomTabPanel>
  );
}
