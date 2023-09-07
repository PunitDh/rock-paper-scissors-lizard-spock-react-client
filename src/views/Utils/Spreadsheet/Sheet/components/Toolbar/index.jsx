import { useEffect, useRef } from "react";
import { FieldButton, FlexForm } from "../styles";
import { FolderOpenSharp, Redo, Save, Undo } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { SheetConfig } from "../../constants";
import { redoState, setContentBulk, undoState } from "../../actions";
import CellContent from "../../models/CellContent";
import Range from "../../models/Range";

const Toolbar = ({ state, dispatch }) => {
  const inputRef = useRef();
  const fileRef = useRef();
  const canUndo = state.currentMementoId !== state.memento[0]?.id;
  const canRedo =
    state.currentMementoId !== state.memento[state.memento.length - 1]?.id;

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
      </FlexForm>
    </div>
  );
};

export default Toolbar;
