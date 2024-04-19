import { Tooltip, Typography } from "@mui/material";

import { Color } from "../../components/styles";
import prettyBytes from "pretty-bytes";
import { Save } from "@mui/icons-material";
import { createSerializedFilename } from "../../utils";
import { StatusButton } from "../../styles";
import FlexBox from "../../../../../../components/shared/FlexBox";
import { Bold } from "../../../../../../components/shared/styles";
import { State } from "../../types";

type Props = {
  state: State;
}

const ResponseStatus = ({ state }: Props): React.ReactNode => {
  const handleSave = () => {
    const content = JSON.stringify(state.response.output, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const serializedName = createSerializedFilename(state.request.name);
    link.setAttribute("download", `${serializedName}.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return state.response.output ? (
    <FlexBox width="100%" gap="1rem" justifyContent="flex-end">
      <Typography textAlign="right" sx={{ display: "flex", gap: "0.3rem" }}>
        <Bold>Status:</Bold>
        <Color type={state.response.error ? "red" : "green"}>
          {state.response.status} {state.response.statusText}
        </Color>
      </Typography>
      <Typography textAlign="right" sx={{ display: "flex", gap: "0.3rem" }}>
        <Bold>Time:</Bold>
        <Color type="green">{state.response.time} ms</Color>
      </Typography>
      <Typography textAlign="right" sx={{ display: "flex", gap: "0.3rem" }}>
        <Bold>Size:</Bold>
        <Color type="green">{prettyBytes(state.response.size)}</Color>
      </Typography>
      <Tooltip title="Save File">
        <StatusButton variant="contained" size="small" onClick={handleSave}>
          <Save />
        </StatusButton>
      </Tooltip>
    </FlexBox>
  ) : null;
};

export default ResponseStatus;
