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
  console.log(state.response.output);

  const Blue = styled.span({
    color: "blue",
  });

  const Red = styled.span({
    color: "red",
  });

  const Green = styled.span({
    color: "green",
  });

  const Indent = styled.div(({ level }) => ({
    marginLeft: `${level * 1}rem`,
  }));

  const Purple = styled.span({
    color: "purple",
  });

  const prettifyHtml = (htmlContent) => {
    const metaRegex = /(<meta[^>]*>)/g;
    const commentRegex = /(<![^>]*>)/g;
    const tagRegex = /(<[^>]*>)/g;
    const attributeRegex = /([a-z\-]+)="([^"]*)"/gi; // Identify attributes

    const parts = htmlContent.replaceAll("\n", "").split(tagRegex);
    const stack = [];

    return parts.map((part, index) => {
      const isTag = part.match(tagRegex);
      const isComment = part.match(commentRegex);
      const isMeta = part.match(metaRegex);
      let level = stack.length;

      if (isTag) {
        if (!part.startsWith("</")) {
          if (!isComment && !isMeta) stack.push(part);
        } else if (stack.length > 0) {
          stack.pop();
          level = stack.length;
        }

        const tagParts = [];
        let lastIndex = 0;
        let match;

        while ((match = attributeRegex.exec(part)) !== null) {
          // Push non-attribute parts
          tagParts.push(part.slice(lastIndex, match.index));
          
          // Push colored attribute name
          tagParts.push(<Purple key={match.index + 'name'}>{match[1]}</Purple>);
          tagParts.push("=");
          // Push colored attribute value
          tagParts.push(<Green key={match.index + 'value'}>"{match[2]}"</Green>);
          
          lastIndex = match.index + match[0].length;
        }

        // Add any remaining parts of the string after the last attribute
        tagParts.push(part.slice(lastIndex));

        return (
          <Indent level={level} key={index}>
            <Red>{tagParts}</Red>
          </Indent>
        );
      } else {
        return (
          <Indent level={level + 1} key={index}>
            <Blue key={index}>{part}</Blue>
          </Indent>
        );
      }
    });
};


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
          <OutputPretty contentEditable={true}>
            {prettifyHtml(state.response.output)}
          </OutputPretty>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default Response;
