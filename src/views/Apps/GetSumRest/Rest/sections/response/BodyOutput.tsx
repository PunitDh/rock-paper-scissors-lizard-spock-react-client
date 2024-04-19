import styled from "@emotion/styled";
import { DisplayType, JSONEditorColors } from "../../constants";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { OutputPretty, OutputRaw } from "../../styles";
import PrettifyObject from "../../components/PrettifyObject";
import PrettifyHTML from "../../components/PrettifyHTML";
import ResponseType from "./ResponseType";
import { isObject } from "../../../../../../utils";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { Action, State } from "../../types";
import { Dispatch } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const OutputDisplay = styled.div({
  width: "100%",
  height: "30rem",
  border: "1px solid rgba(0,0,0,0.1)",
  fontFamily: "monospace",
  padding: "1rem",
  overflowY: "scroll",
});

const BodyOutput = ({ state, dispatch }: Props): React.ReactNode => (
  <>
    <ResponseType state={state} dispatch={dispatch} />
    <FlexBox width="100%" flexGrow={1} flex="1 0 auto">
      {state.response.displayType === DisplayType.PREVIEW ? (
        state.response.json ? (
          <JSONInput
            id="json-output"
            locale={locale}
            placeholder={state.response.output}
            width="100%"
            height="20rem"
            theme="light_mitsuketa_tribute"
            colors={JSONEditorColors}
            style={{ body: { fontSize: "14px" } }}
            viewOnly={true}
            waitAfterKeyPress={1500}
            data-gramm="false"
          />
        ) : (
          <OutputDisplay
            dangerouslySetInnerHTML={{ __html: state.response.output }}
            contentEditable={true}
          />
        )
      ) : state.response.displayType === DisplayType.RAW ? (
        isObject(state.response.output) ? (
          <OutputRaw
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {JSON.stringify(state.response.output, null, 2)}
          </OutputRaw>
        ) : (
          <OutputRaw
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {String(state.response.output)}
          </OutputRaw>
        )
      ) : isObject(state.response.output) ? (
        <OutputPretty
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <PrettifyObject>{state.response.output}</PrettifyObject>
        </OutputPretty>
      ) : (
        <OutputPretty
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <PrettifyHTML>{state.response.output}</PrettifyHTML>
        </OutputPretty>
      )}
    </FlexBox>
  </>
);

export default BodyOutput;
