import styled from "@emotion/styled";

export const Blue = styled.span({
  color: "blue",
});

export const Red = styled.span({
  color: "red",
});

export const Green = styled.span({
  color: "green",
});

export const Purple = styled.span({
  color: "purple",
});

export const Indent = styled.div(({ level }) => ({
  marginLeft: `${level * 1}rem`,
}));

export const Black = styled.span({
  color: "black",
});

export const Margin = styled.span(({ depth }) => ({
  marginLeft: `${depth}rem`,
}));
