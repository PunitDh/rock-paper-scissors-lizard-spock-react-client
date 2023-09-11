import React from "react";
import JSONInput from "react-json-editor-ajrm";
import { colors } from "../colors";
import locale from "react-json-editor-ajrm/locale/en";

const ApplicationJSON = ({ state, dispatch }) => {
  const handleBodyChange = (e) => {
    console.log(e);
  };

  return (
    <JSONInput
      id="body-json-input"
      locale={locale}
      placeholder={state.body}
      width="100%"
      height="20rem"
      theme="light_mitsuketa_tribute"
      colors={colors}
      style={{ body: { fontSize: "14px" } }}
      onChange={handleBodyChange}
      waitAfterKeyPress={2500}
      data-gramm="false"
    />
  );
};

export default ApplicationJSON;
