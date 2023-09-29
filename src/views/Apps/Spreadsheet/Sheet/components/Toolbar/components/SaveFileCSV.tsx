import { Tooltip } from "@mui/material";
import { FieldButton } from "../../styles";
import CSVIcon from "./icons/CSVIcon";
import { State } from "../../../types";
import { exportSheetAsCSV } from "../../../utils/sheetUtils";

type Props = {
  state: State;
};

const SaveFileCSV = ({ state }: Props) => {
  const activeSheet = state.sheets[state.activeSheet];

  const exportAsCSV = () =>
    exportSheetAsCSV(
      activeSheet,
      state.maxRows,
      state.maxColumns,
      activeSheet.name,
    );

  return (
    <Tooltip title="Export as CSV">
      <FieldButton type="button" onClick={exportAsCSV}>
        {/* <Save sx={{ width: "1rem" }} /> */}
        <CSVIcon width="1rem" />
      </FieldButton>
    </Tooltip>
  );
};

export default SaveFileCSV;
