import { isString } from "src/utils";
import { Blue, Green, Indent, Purple, Red } from "./styles";

export default function PrettifyHTML({ children }) {
  if (!isString(children)) return <></>;
  // const metaRegex = /(<meta[^>]*>)/g;
  const selfClosingRegex = /(<[^>]*\/>)/g;
  const commentRegex = /(<![^>]*>)/g;
  const tagRegex = /(<[^>]*>)/g;
  const attributeRegex = /([a-z-]+)=(["'])([^"]*)(["'])/gi; // Identify attributes

  const parts = children.replaceAll("\n", "").split(tagRegex);
  const stack = [];

  const jsx = parts.map((part, index) => {
    const isTag = part.match(tagRegex);
    const isComment = part.match(commentRegex);
    const isSelfClosing = part.match(selfClosingRegex);
    let level = stack.length;

    if (isTag) {
      if (!part.startsWith("</")) {
        if (!isComment && !isSelfClosing) stack.push(part);
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
        tagParts.push(<Purple key={match.index + "name"}>{match[1]}</Purple>);
        tagParts.push("=");
        // Push colored attribute value
        tagParts.push(
          <Green key={match.index + "value"}>
            {match[2]}
            {match[3]}
            {match[4]}
          </Green>
        );

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

  return jsx;
}
