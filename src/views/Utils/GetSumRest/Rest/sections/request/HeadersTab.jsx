import React from "react";
import CustomTabPanel from "../../components/CustomTabPanel";
import { Bold } from "src/components/shared/styles";
import KeyValueComponent from "../../components/KeyValueComponent";
import { setHeaders } from "../../actions";

export default function HeadersTab({ state, dispatch, value }) {
  const handleChange = (e) => dispatch(setHeaders(e));

  return (
    <CustomTabPanel value={value} index={2}>
      <Bold>Headers</Bold>
      <KeyValueComponent property={state.request.headers} onChange={handleChange} />
    </CustomTabPanel>
  );
}
