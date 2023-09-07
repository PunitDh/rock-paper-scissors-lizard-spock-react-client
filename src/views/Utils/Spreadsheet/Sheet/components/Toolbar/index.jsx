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

const Toolbar = ({ state, dispatch }) => {
  const inputRef = useRef();
  const fileRef = useRef();
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
      .then((data) => setFonts([...fonts, ...data].sort()))
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

  const handleExportAsCsv = (e) => {
    const range = Range.create(
      `A1`,
      `${SheetConfig.COLUMNS[state.maxColumns - 1]}${state.maxRows}`
    );
    const content = range.cells
      .map((row) =>
        row.map((cell) => state.content[cell.id]?.value || "").join(",")
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Sheet1.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleOpenFile = (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const content = csvToStateContent(text);
      const filtered = Object.keys(content).reduce((acc, cur) => {
        if (content[cur]?.value.length > 0) {
          acc[cur] = new CellContent({
            value: content[cur].value,
          });
        }
        return acc;
      }, {});
      dispatch(setContentBulk(filtered));
    };
    reader.readAsText(e.target.files[0]);

    function csvToStateContent(csvString) {
      const rows = csvString.trim().split("\n");
      let content = {};

      rows.forEach((row, rowIndex) => {
        row.split(",").forEach((cellValue, colIndex) => {
          const colLabel = SheetConfig.COLUMNS[colIndex];
          const cellId = `${colLabel}${rowIndex + 1}`;
          content[cellId] = new CellContent({ value: cellValue, formula: "" });
        });
      });

      return content;
    }
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
        <Tooltip title="Open a CSV File">
          <FieldButton type="button">
            <label style={{ cursor: "pointer" }} htmlFor="csv-file-upload">
              <FolderOpenSharp sx={{ width: "1rem" }} />
            </label>
            <input
              type="file"
              id="csv-file-upload"
              style={{ display: "none" }}
              ref={fileRef}
              onChange={handleOpenFile}
            />
          </FieldButton>
        </Tooltip>
        {/* <FieldButton type="button">
          <Save sx={{ width: "1rem" }} />
        </FieldButton> */}
        <Tooltip title="Export as CSV">
          <FieldButton type="button" onClick={handleExportAsCsv}>
            <Save sx={{ width: "1rem" }} />
            {/* <Download sx={{ width: "1rem" }} /> */}
          </FieldButton>
        </Tooltip>
        <Tooltip title={canUndo ? "Undo" : "Undo (disabled)"}>
          <span>
            <FieldButton type="button" onClick={handleUndo} disabled={!canUndo}>
              <Undo sx={{ width: "1rem" }} />
            </FieldButton>
          </span>
        </Tooltip>
        <Tooltip title={canRedo ? "Redo" : "Redo (disabled)"}>
          <span>
            <FieldButton type="button" onClick={handleRedo} disabled={!canRedo}>
              <Redo sx={{ width: "1rem" }} />
            </FieldButton>
          </span>
        </Tooltip>
        <Tooltip title={"Select font"}>
          <span>
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
          </span>
        </Tooltip>
        <Tooltip title={"Select font size"}>
          <span>
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
          </span>
        </Tooltip>
        <Tooltip title={"Bold"}>
          <span>
            <FieldButton
              type="button"
              isactive={selectedFormatting.fontWeight === "bold"}
              onClick={handleBold}
            >
              <strong>B</strong>
            </FieldButton>
          </span>
        </Tooltip>
        <Tooltip title={"Italics"}>
          <span>
            <FieldButton
              type="button"
              isactive={selectedFormatting.fontStyle === "italic"}
              onClick={handleItalics}
            >
              <span style={{ fontStyle: "italic" }}>I</span>
            </FieldButton>
          </span>
        </Tooltip>
        <Tooltip title={"Underline"}>
          <span>
            <FieldButton
              type="button"
              isactive={selectedFormatting.textDecoration === "underline"}
              onClick={handleUnderline}
            >
              <span style={{ textDecoration: "underline" }}>U</span>
            </FieldButton>
          </span>
        </Tooltip>
      </FlexForm>
    </div>
  );
};

export default Toolbar;
