import { useEffect, useRef } from "react";
import { FieldButton, FlexForm } from "../styles";
import { Download, Save } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { SheetConfig } from "../../../constants";
import Range from "../../../models/Range";

const Toolbar = ({ state }) => {
  const inputRef = useRef();

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

  return (
    <div tabIndex="1000" onBlur={handleBlur}>
      <FlexForm onSubmit={handleSubmit}>
        <FieldButton type="button" variant="secondary">
          <Save sx={{ width: "1rem" }} />
        </FieldButton>
        <Tooltip title="Export As CSV">
          <FieldButton
            type="button"
            variant="secondary"
            onClick={handleExportAsCsv}
          >
            <Download sx={{ width: "1rem" }} />
          </FieldButton>
        </Tooltip>
      </FlexForm>
    </div>
  );
};

export default Toolbar;
