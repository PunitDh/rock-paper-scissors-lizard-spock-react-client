import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { setBodyContent } from "../../../../actions";
import { ContentType, JSONEditorColors } from "../../../../constants";
import { Action, State } from "../../../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const ApplicationJSON = ({ state, dispatch }: Props) => {
  const handleBodyChange = (e: { jsObject: { [x: string]: any } }) =>
    dispatch(setBodyContent(ContentType.JSON, e.jsObject));

  return (
    <JSONInput
      id="body-json-input"
      locale={locale}
      placeholder={state.request.body.json}
      width="100%"
      height="20rem"
      theme="light_mitsuketa_tribute"
      colors={JSONEditorColors}
      style={{ body: { fontSize: "14px" } }}
      onChange={handleBodyChange}
      waitAfterKeyPress={1500}
      data-gramm="false"
    />
  );
};

export default ApplicationJSON;
