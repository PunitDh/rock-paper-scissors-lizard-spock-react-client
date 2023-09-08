import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlexForm } from "../styles";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatUnderlined,
  Redo,
  Undo,
} from "@mui/icons-material";
import {
  redoState,
  setSelectedCellFormatting,
  undoState,
  setCellFormattingBulk,
} from "../../actions";
import OpenFile from "./OpenFile";
import SaveFile from "./SaveFile";
import FormattingButton from "./FormattingButton";
import HistoryButton from "./HistoryButton";
import NumberFormattingSelect from "./NumberFormattingSelect";
import ColorPicker from "./ColorPicker";
import FontFamilySelect from "./FontFamilySelect";
import FontSizeSelect from "./FontSizeSelect";
import BorderStyleSelect from "./BorderStyleSelect";

const Toolbar = ({ state, dispatch }) => {
  const inputRef = useRef();
  const canUndo = state.currentMementoId !== state.memento[0]?.id;
  const canRedo =
    state.currentMementoId !== state.memento[state.memento.length - 1]?.id;

  const stateCellFormatting = useMemo(
    () => state.content[state.selectedCell.id]?.formatting || {},
    [state.content, state.selectedCell.id]
  );

  const [selectedFormatting, setSelectedFormatting] =
    useState(stateCellFormatting);

  useEffect(() => {
    setSelectedFormatting(stateCellFormatting);
  }, [stateCellFormatting]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBlur = (e) => {
    // if (!state.formulaMode) dispatch(setformulaFieldFocused(false));
  };

  useEffect(() => {
    if (state.formulaFieldFocused) {
      inputRef.current?.focus();
    }
  }, [state.formulaFieldFocused]);

  const handleUndo = (e) => {
    canUndo && dispatch(undoState());
  };

  const handleRedo = (e) => {
    canRedo && dispatch(redoState());
  };

  const toggleStyle = useCallback(
    (styleKey, activeValue, inactiveValue) => {
      const currentValue = stateCellFormatting?.[styleKey];
      return currentValue === activeValue ? inactiveValue : activeValue;
    },
    [stateCellFormatting]
  );

  const setFormattingChange = useCallback(
    (formattingKey) => (event) => {
      const value = event.target?.value || event;
      const formatting = { [formattingKey]: value };
      dispatch(setSelectedCellFormatting(formatting));
      dispatch(setCellFormattingBulk(formatting));
    },
    [dispatch]
  );

  const setTextAlign = (textAlign) => () => {
    setFormattingChange("textAlign")(textAlign);
  };

  const createToggleHandler = useCallback(
    (formattingKey, activeValue, inactiveValue) => () => {
      const newValue = toggleStyle(formattingKey, activeValue, inactiveValue);
      setFormattingChange(formattingKey)(newValue);
    },
    [setFormattingChange, toggleStyle]
  );

  const toggleBold = createToggleHandler("fontWeight", "bold", "normal");
  const toggleItalic = createToggleHandler("fontStyle", "italic", "normal");
  const toggleUnderline = createToggleHandler(
    "textDecoration",
    "underline",
    "none"
  );

  return (
    <div tabIndex="1000" onBlur={handleBlur}>
      <FlexForm onSubmit={handleSubmit}>
        <OpenFile dispatch={dispatch} />
        <SaveFile state={state} />
        <HistoryButton
          title="Undo"
          Icon={Undo}
          onClick={handleUndo}
          disabled={!canUndo}
        />
        <HistoryButton
          title="Redo"
          Icon={Redo}
          onClick={handleRedo}
          disabled={!canRedo}
        />
        <FontFamilySelect
          state={selectedFormatting}
          onChange={setFormattingChange("fontFamily")}
        />
        <FontSizeSelect
          state={selectedFormatting}
          onChange={setFormattingChange("fontSize")}
        />
        <BorderStyleSelect
          state={selectedFormatting}
          onChange={setFormattingChange("border")}
        />
        <NumberFormattingSelect
          state={selectedFormatting}
          onChange={() => {}}
        />
        <FormattingButton
          title={"Bold"}
          isActive={selectedFormatting.fontWeight === "bold"}
          onClick={toggleBold}
          Icon={FormatBold}
        />
        <FormattingButton
          title={"Italics"}
          isActive={selectedFormatting.fontStyle === "italic"}
          onClick={toggleItalic}
          Icon={FormatItalic}
        />
        <FormattingButton
          title={"Underline"}
          isActive={selectedFormatting.textDecoration === "underline"}
          onClick={toggleUnderline}
          Icon={FormatUnderlined}
        />
        <ColorPicker
          Icon={FormatColorFill}
          state={selectedFormatting}
          onChange={() => {}}
        />
        <ColorPicker
          Icon={FormatColorText}
          state={selectedFormatting}
          onChange={() => {}}
        />
        <FormattingButton
          title={"Align left"}
          isActive={selectedFormatting.textAlign === "left"}
          onClick={setTextAlign("left")}
          Icon={FormatAlignLeft}
        />
        <FormattingButton
          title={"Align center"}
          isActive={selectedFormatting.textAlign === "center"}
          onClick={setTextAlign("center")}
          Icon={FormatAlignCenter}
        />
        <FormattingButton
          title={"Align right"}
          isActive={selectedFormatting.textAlign === "right"}
          onClick={setTextAlign("right")}
          Icon={FormatAlignRight}
        />
      </FlexForm>
    </div>
  );
};

export default Toolbar;
