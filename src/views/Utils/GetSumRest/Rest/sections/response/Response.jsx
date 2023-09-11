import locale from "react-json-editor-ajrm/locale/en";
import JSONInput from "react-json-editor-ajrm";
import { jsonEditorColors } from "../request/BodyTab/constants";
import { FlexBox } from "src/components/shared/styles";

const Response = ({ state, dispatch }) => {
  return (
    <FlexBox width="100%">
      {state.response.json ? (
        <JSONInput
          id="json-output"
          locale={locale}
          placeholder={state.response.output}
          width="100%"
          height="20rem"
          theme="light_mitsuketa_tribute"
          colors={jsonEditorColors}
          style={{ body: { fontSize: "14px" } }}
          viewOnly={true}
          waitAfterKeyPress={1500}
          data-gramm="false"
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "30rem",
            border: "1px solid rgba(0,0,0,0.1)",
            fontFamily: "monospace",
            padding: "1rem",
            overflowY: "scroll"
          }}
          dangerouslySetInnerHTML={{ __html: state.response.output }}
          contentEditable={true}
        >
          {/* <FlexBox contentEditable={true} width="100%">
            {state.response.output}
          </FlexBox> */}
        </div>
      )}
    </FlexBox>
  );
};

export default Response;
