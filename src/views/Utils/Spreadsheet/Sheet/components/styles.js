import styled from "@emotion/styled";

export const InputTextField = styled.input({
  width: "100%",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

export const SmallInputField = styled(InputTextField)({
  width: "2rem",
  textAlign: "center",
});

export const FlexForm = styled.form({
  display: "flex",
  gap: "0.2rem",
  padding: "0.5rem",
  backgroundColor: "rgba(0,0,0,0.1)",
});

export const FieldButton = styled.button(({ variant, theme, isactive }) => ({
  width: "1.75rem",
  outline: "none",
  border: isactive ? "1px solid blue" : "1px solid rgba(0,0,0,0.3)",
  height: "1.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  cursor: "pointer",
  color: theme.palette[variant]?.dark || "black",
  backgroundColor: isactive ? "#eeeeee" : "inherit",
  "&:hover": {
    color: "blue",
    backgroundColor: "#eee",
    border: "1px solid blue",
  },
  "&:active": {
    color: theme.palette[variant]?.main || "black",
    backgroundColor: "#999",
    border: "1px solid black",
  },
  "&:disabled": {
    color: "#bbb",
    backgroundColor: "#eee",
  },
}));
