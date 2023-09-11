import locale from "react-json-editor-ajrm/locale/en";
import JSONInput from "react-json-editor-ajrm";
import { jsonEditorColors } from "../request/BodyTab/constants";
import { Bold, FlexBox } from "src/components/shared/styles";
import StatusBar from "./StatusBar";
import { useMediaQuery } from "@mui/material";
import { DisplayType } from "./constants";
import styled from "@emotion/styled";
import Prettify from "./Prettify";

const OutputDisplay = styled.div({
  width: "100%",
  height: "30rem",
  border: "1px solid rgba(0,0,0,0.1)",
  fontFamily: "monospace",
  padding: "1rem",
  overflowY: "scroll",
});

const OutputRaw = styled.pre({
  width: "100%",
  height: "30rem",
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "1rem",
  overflowY: "scroll",
  fontFamily: "'Roboto Mono', Monaco, monospace;",
});

const OutputPretty = styled(OutputRaw)({
  color: "#ff4455",
});

const Response = ({ state, dispatch }) => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <FlexBox
      flexDirection="column"
      width="95%"
      alignItems="flex-start"
      margin="auto"
    >
      <Bold>Response</Bold>
      <StatusBar state={state} dispatch={dispatch} />
      <FlexBox width="100%">
        {state.response.displayType === DisplayType.PREVIEW ? (
          state.response.json ? (
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
            <OutputDisplay
              dangerouslySetInnerHTML={{ __html: state.response.output }}
              contentEditable={true}
            ></OutputDisplay>
          )
        ) : state.response.displayType === DisplayType.RAW ? (
          typeof state.response.output === "object" ? (
            <OutputRaw contentEditable={true}>
              {JSON.stringify(state.response.output, null, 2)}
            </OutputRaw>
          ) : (
            <OutputRaw contentEditable={true}>
              {String(state.response.output)}
            </OutputRaw>
          )
        ) : typeof state.response.output === "object" ? (
          <OutputPretty contentEditable={true}>
            {/* {JSON.stringify(state.response.output, null, 2).replaceAll(
              '"',
              `<span style={{ color: "blue" }}>"</span>`
            )} */}
            <Prettify>{state.response.output}</Prettify>
          </OutputPretty>
        ) : (
          <div contentEditable={true}>
            <Prettify>{state.response.output}</Prettify>
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default Response;
