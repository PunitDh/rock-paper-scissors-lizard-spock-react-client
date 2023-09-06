import { useEffect, useRef } from "react";
import { selectCell } from "../actions";
import styled from "@emotion/styled";
import Cell from "../../models/Cell";

const InputField = styled.input({
  width: "100%",
  outline: "none",
  borderRadius: 0,
  border: "1px solid rgba(0,0,0,0.2)",
  lineHeight: "1.5rem",
});

const SheetTab = styled.div({
  width: "4rem",
  backgroundColor: "white",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  alignSelf: "flex-start",
  lineHeight: "1.5rem",
  position: "relative",
  marginTop: "-0.1rem",
  zIndex: "1",
  "&:before": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    left: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderLeftColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    backgroundColor: "white",
    width: "1rem",
    height: "0.1rem",
    top: -7,
    right: "-1rem",
    // outline: "1px solid red",
    border: "6px solid white",
    borderBottomColor: "rgba(255,0,0,0.1)",
    borderRightColor: "rgba(255,0,0,0.1)",
    zIndex: "2",
  },
});

const SmallInputField = styled(InputField)({
  width: "2rem",
  textAlign: "center",
  opacity: 0,
});

const FlexForm = styled.form({
  display: "flex",
  gap: "0.2rem",
  padding: "0.5rem",
  paddingTop: "0",
  marginTop: "0",
  backgroundColor: "rgba(0,0,0,0.1)",
});

const FieldButton = styled.button(({ variant, theme }) => ({
  width: "1.5rem",
  outline: "none",
  border: "1px solid rgba(0,0,0,0.3)",
  height: "1.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  cursor: "pointer",
  color: theme.palette[variant]?.dark || "black",
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
    color: "rgba(0,0,0,0.6)",
    backgroundColor: "#eee",
  },
}));

const StatusField = ({ state, dispatch }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlur = (e) => {
    // if (!state.formulaMode) dispatch(setInputTextFocused(false));
  };

  useEffect(() => {
    if (state.inputTextFocused) {
      inputRef.current?.focus();
    }
  }, [state.inputTextFocused]);

  const handleSelectCell = (e) => {
    e.preventDefault();
    const cell = new Cell(e.target.value.toUpperCase());
    if (cell.id) {
      dispatch(selectCell(cell.id));
    }
  };

  return (
    <div tabIndex="1000" onBlur={handleBlur}>
      <FlexForm onSubmit={handleSubmit}>
        <SmallInputField
          ref={inputRef}
          name="currentCell"
          type="text"
          value={state.selectedCell.id}
          onChange={handleSelectCell}
          autoComplete="off"
          id="current-cell"
          tabIndex={2}
        />
        {/* <SheetTab>Sheet 1</SheetTab> */}
      </FlexForm>
    </div>
  );
};

export default StatusField;
