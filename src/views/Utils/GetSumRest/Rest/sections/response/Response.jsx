import locale from "react-json-editor-ajrm/locale/en";
import JSONInput from "react-json-editor-ajrm";
import { Bold, FlexBox } from "src/components/shared/styles";
import StatusBar from "./StatusBar";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import PrettifyHTML from "../../components/PrettifyHTML";
import PrettifyObject from "../../components/PrettifyObject";
import { OutputPretty, OutputRaw } from "../../styles";
import { DisplayType, JSONEditorColors } from "../../constants";

const OutputDisplay = styled.div({
  width: "100%",
  height: "30rem",
  border: "1px solid rgba(0,0,0,0.1)",
  fontFamily: "monospace",
  padding: "1rem",
  overflowY: "scroll",
});

const Response = ({ state, dispatch }) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <FlexBox
      flexDirection="column"
      width="95%"
      alignItems="flex-start"
      margin="auto"
      flexGrow={1}
    >
      <Bold>Response</Bold>
      <StatusBar state={state} dispatch={dispatch} />
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
            ></OutputDisplay>
          )
        ) : state.response.displayType === DisplayType.RAW ? (
          typeof state.response.output === "object" ? (
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
        ) : typeof state.response.output === "object" ? (
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
    </FlexBox>
  );
};

export default Response;
