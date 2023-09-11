import styled from "@emotion/styled";
import React from "react";

const Blue = styled.span({
  color: "blue",
});

const Red = styled.span({
  color: "red",
});

const Green = styled.span({
  color: "green",
});

const Purple = styled.span({
  color: "purple",
});

const Black = styled.span({
  color: "black",
});

const Margin = styled.span(({ depth }) => ({
  marginLeft: `${depth}rem`,
}));

const Prettify = ({ children }) => {
  if (!children) return <span>null</span>;

  const prettify = (object, depth = 1) => {
    if (Array.isArray(object)) {
      return (
        <>
          <Black>[</Black>
          <br />
          {object.map((item, index) => (
            <Margin key={index} depth={depth}>
              {typeof item === "number" ? (
                <Green>{item}</Green>
              ) : typeof item === "boolean" ? (
                <Purple>{item.toString()}</Purple>
              ) : typeof item === "string" ? (
                <Blue>
                  <Red>"</Red>
                  {item}
                  <Red>"</Red>
                </Blue>
              ) : typeof item === "object" ? (
                prettify(item, depth + 1)
              ) : (
                JSON.stringify(item)
              )}
              {index !== object.length - 1 && (
                <>
                  ,<br />
                </>
              )}
            </Margin>
          ))}
          <br />
          <Black>]</Black>
        </>
      );
    } else {
      const keys = Object.keys(object);
      return (
        <>
          <Black>{"{"}</Black>
          <br />
          {keys.map((key, index) => (
            <Margin key={key} depth={depth}>
              <Red>"{key}"</Red>:{" "}
              {typeof object[key] === "number" ? (
                <Green>{object[key]}</Green> // Numbers are printed Green
              ) : typeof object[key] === "boolean" ? (
                <Purple>{object[key].toString()}</Purple> // Booleans are purple
              ) : typeof object[key] === "string" ? (
                <Blue>"{object[key]}"</Blue> // Strings are blue
              ) : typeof object[key] === "object" ? (
                prettify(object[key], depth + 1)
              ) : (
                JSON.stringify(object[key])
              )}
              {index !== keys.length - 1 && (
                <>
                  ,<br />
                </>
              )}
            </Margin>
          ))}
          <br />
          <Margin depth={depth - 1}>
            <Black>{"}"}</Black>
          </Margin>
        </>
      );
    }
  };

  return <div>{prettify(children)}</div>;
};

export default Prettify;
