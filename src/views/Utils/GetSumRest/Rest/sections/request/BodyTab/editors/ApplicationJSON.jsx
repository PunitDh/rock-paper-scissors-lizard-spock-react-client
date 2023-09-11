import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { ContentType, jsonEditorColors } from "../constants";
import { setBodyContent } from "../../../../actions";

const ApplicationJSON = ({ state, dispatch }) => {
  const handleBodyChange = (e) =>
    dispatch(setBodyContent(ContentType.JSON, e.jsObject));

  return (
    <JSONInput
      id="body-json-input"
      locale={locale}
      placeholder={state.request.body.json}
      width="100%"
      height="20rem"
      theme="light_mitsuketa_tribute"
      colors={jsonEditorColors}
      style={{ body: { fontSize: "14px" } }}
      onChange={handleBodyChange}
      waitAfterKeyPress={1500}
      data-gramm="false"
    />
  );
};

export default ApplicationJSON;
