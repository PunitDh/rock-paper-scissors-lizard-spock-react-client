import styled from "@emotion/styled";

type SheetButtonItemProps = {
  active?: boolean;
};

export const SheetInputItem = styled.input({
  backgroundColor: "#E1E3E3",
  border: "1px solid rgba(0,0,0,0.1)",
  outline: "none",
  textAlign: "center",
  height: "2rem",
  width: "5rem",
  "&:hover": {
    border: "1px solid black",
  },
});

export const SheetButtonItem = styled.button(
  ({ active }: SheetButtonItemProps) => ({
    backgroundColor: active ? "#E0E9FF" : "#EAEAEA",
    border: active ? "1px solid black" : "1px solid rgba(0,0,0,0.1)",
    outline: "none",
    cursor: "pointer",
    padding: "0.5rem 1rem 0.5rem 1rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "element",
    "&:hover": {
      backgroundColor: "#E0E9F7",
      border: "1px solid black",
    },
    "&:active": {
      backgroundColor: "#A0A9FF",
      border: "1px solid black",
    },
  })
);

export const DragArea = styled.div({
  display: "inline-flex",
  gap: "0.5rem",
});
