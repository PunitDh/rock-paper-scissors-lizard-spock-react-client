import styled from "@emotion/styled";
import { Button, Tooltip, Typography } from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import { setOutputDisplayType } from "../../actions";
import { DisplayType } from "./constants";
import { Green } from "./styles";
import { Save } from "@mui/icons-material";

const StatusButton = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? "#eee" : "#ddd",
}));

const StatusBar = ({ state, dispatch }) => {
  const handleSetDisplayType = (displayType) => () =>
    dispatch(setOutputDisplayType(displayType));

  const handleSave = () => {
    const content = JSON.stringify(state.response.output, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date();
    const serializedName = `${state.request.method}-${
      state.request.url.href
    }-${date.toLocaleDateString()}-${date.toLocaleTimeString()}`
      .replaceAll(/([:/?=."'+*^\\])/g, " ")
      .split(" ")
      .filter((it) => it.length)
      .join("-");
    link.setAttribute("download", `${serializedName}.json`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <FlexBox width="100%" justifyContent="space-between" marginTop="1rem">
      <FlexBox width="100%" gap="0.1rem" justifyContent="flex-start">
        {Object.values(DisplayType).map((displayType) => (
          <StatusButton
            variant="secondary"
            selected={state.response.displayType === displayType}
            onClick={handleSetDisplayType(displayType)}
            key={displayType}
          >
            {displayType}
          </StatusButton>
        ))}
      </FlexBox>
      {state.response.output && (
        <FlexBox width="50%" gap="1rem" justifyContent="flex-end">
          <Typography textAlign="right" sx={{ display: "flex", gap: "0.3rem" }}>
            <Bold>Status:</Bold>
            <Green>
              {state.response.status} {state.response.statusText}
            </Green>
          </Typography>
          <Typography textAlign="right" sx={{ display: "flex", gap: "0.3rem" }}>
            <Bold>Size:</Bold>
            <Green>{state.response.size}</Green>
          </Typography>
          <Tooltip title="Save File">
            <StatusButton variant="primary" size="small" onClick={handleSave}>
              <Save />
            </StatusButton>
          </Tooltip>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default StatusBar;
