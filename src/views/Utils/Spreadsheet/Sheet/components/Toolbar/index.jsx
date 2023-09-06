import { useCallback, useEffect, useRef, useState } from "react";
import { FieldButton, FlexForm } from "../styles";
import { Download, Save } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { SheetConfig } from "../../../constants";
import Range from "../../../models/Range";
import { useNavigate } from "react-router";

const Toolbar = ({ state, dispatch }) => {
  const inputRef = useRef();
  const [csvHref, setCsvHref] = useState(null);
  const csvRef = useRef();
  const navigate = useNavigate();

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
