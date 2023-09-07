import { useEffect, useMemo, useRef, useState } from "react";
import { FieldButton, FlexForm } from "../styles";
import { FolderOpenSharp, Redo, Save, Undo } from "@mui/icons-material";
import { MenuItem, Select, Tooltip } from "@mui/material";
import { SheetConfig } from "../../constants";
import {
  redoState,
  setSelectedCellFormatting,
  setContentBulk,
  undoState,
  setCellFormattingBulk,
} from "../../actions";
import CellContent from "../../models/CellContent";
import Range from "../../models/Range";
import { getFonts } from "../../utils/fontUtils";
import { fontSelectStyle } from "./styles";
import OpenFile from "./OpenFile";
import SaveFile from "./SaveFile";
import FormattingToggleButton from "./FormattingButton";
import HistoryButton from "./HistoryButton";

const Toolbar = ({ state, dispatch }) => {
  const inputRef = useRef();
  const canUndo = state.currentMementoId !== state.memento[0]?.id;
  const canRedo =
    state.currentMementoId !== state.memento[state.memento.length - 1]?.id;
  const [fonts, setFonts] = useState(["Sans-serif"]);

  const getFont = useMemo(
    () => state.content[state.selectedCell.id]?.formatting || {},
    [state.content, state.selectedCell.id]
  );

  const [selectedFormatting, setSelectedFormatting] = useState(getFont);

  useEffect(() => {
    getFonts()
      .then((data) => setFonts(fonts.concat(data).sort()))
      .catch(() => console.error);
  }, []);

  useEffect(() => {
    setSelectedFormatting(getFont);
  }, [getFont]);

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

  const handleFontFamilyChange = (e) => {
    dispatch(setSelectedCellFormatting({ fontFamily: e.target.value }));
    dispatch(setCellFormattingBulk({ fontFamily: e.target.value }));
  };

  const handleFontSizeChange = (e) => {
    dispatch(setSelectedCellFormatting({ fontSize: e.target.value }));
    dispatch(setCellFormattingBulk({ fontSize: e.target.value }));
  };

  const [bold, setBold] = useState(selectedFormatting.fontWeight === "bold");
  const [italic, setItalic] = useState(
    selectedFormatting.fontStyle === "italic"
  );
  const [underline, setUnderline] = useState(
    selectedFormatting.textDecoration === "underline"
  );

  const handleBold = (e) => {
    setBold((bold) => !bold);
    dispatch(
      setSelectedCellFormatting({ fontWeight: bold ? "bold" : "normal" })
    );
    dispatch(setCellFormattingBulk({ fontWeight: bold ? "bold" : "normal" }));
  };

  const handleItalics = (e) => {
    setItalic((italic) => !italic);
    dispatch(
      setSelectedCellFormatting({ fontStyle: italic ? "italic" : "normal" })
    );
    dispatch(
      setCellFormattingBulk({ fontStyle: italic ? "italic" : "normal" })
    );
  };

  const handleUnderline = (e) => {
    setUnderline((underline) => !underline);
    dispatch(
      setSelectedCellFormatting({
        textDecoration: underline ? "underline" : "none",
      })
    );
    dispatch(
      setCellFormattingBulk({
        textDecoration: underline ? "underline" : "none",
      })
    );
  };

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

        <Select
          labelId={"font-selector"}
          id={"font-selector"}
          name="fontSelector"
          onChange={handleFontFamilyChange}
          value={selectedFormatting.fontFamily || "Sans-serif"}
          size="small"
          sx={fontSelectStyle({ font: selectedFormatting.fontFamily })}
        >
          {fonts.map((font) => (
            <MenuItem
              sx={{ fontFamily: font }}
              selected={selectedFormatting.fontFamily === font}
              key={font}
              value={font}
            >
              {font}
            </MenuItem>
          ))}
        </Select>

        <Select
          labelId={"font-size-selector"}
          id={"font-size-selector"}
          name="fontSizeSelector"
          onChange={handleFontSizeChange}
          value={selectedFormatting.fontSize || 12}
          size="small"
          sx={fontSelectStyle({ font: selectedFormatting.fontSize })}
        >
          {[8, 10, 12, 14, 16, 18, 20, 24].map((size) => (
            <MenuItem
              sx={{ fontSize: size }}
              selected={selectedFormatting.fontSize === size}
              key={size}
              value={size}
            >
              {size}
            </MenuItem>
          ))}
        </Select>

        <FormattingToggleButton
          title={"Bold"}
          isActive={selectedFormatting.fontWeight === "bold"}
          onClick={handleBold}
        >
          <strong>B</strong>
        </FormattingToggleButton>
        <FormattingToggleButton
          title={"Italics"}
          isActive={selectedFormatting.fontStyle === "italic"}
          onClick={handleItalics}
        >
          <span style={{ fontStyle: "italic" }}>I</span>
        </FormattingToggleButton>

        <FormattingToggleButton
          title={"Underline"}
          isActive={selectedFormatting.textDecoration === "underline"}
          onClick={handleUnderline}
        >
          <span style={{ textDecoration: "underline" }}>U</span>
        </FormattingToggleButton>
      </FlexForm>
    </div>
  );
};

export default Toolbar;
