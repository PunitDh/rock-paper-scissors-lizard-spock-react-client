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

const Yellow = styled.span({
  color: "yellow",
});

const Orange = styled.span({
  color: "orange",
});

const Purple = styled.span({
  color: "purple",
});

const Margin = styled.span(({ depth }) => ({
  marginLeft: `${depth}rem`,
}));

const Prettify = ({ children }) => {
  const keys = Object.keys(children);
  const values = Object.values(children);

  console.log({ children });

  const prettify = (object, depth = 1) => {
    const keys = Object.keys(object);
    return (
      <>
        {"{"}
        <br />
        {keys.map((key, index) => (
          <Margin key={key} depth={depth}>
            <Red>"</Red>
            <Red>{key}</Red>
            <Red>"</Red>:{" "}
            {typeof object[key] === "number" ? (
              <Green>{object[key]}</Green>
            ) : typeof object[key] === "boolean" ? (
              <Purple>{object[key].toString()}</Purple>
            ) : typeof object[key] === "string" ? (
              <>
                <Blue>
                  <Blue>"</Blue>
                  {object[key]}
                  <Blue>"</Blue>
                </Blue>
              </>
            ) : Array.isArray(object[key]) ||
              (object[key] && typeof object[key] === "object") ? (
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
        {"}"}
      </>
    );
  };

  return <div>{prettify(children)}</div>;
};

export default Prettify;
