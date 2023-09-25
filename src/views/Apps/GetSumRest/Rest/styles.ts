import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const OutputRaw = styled.pre({
  width: "100%",
  height: "30rem",
  border: "1px solid rgba(0,0,0,0.1)",
  padding: "1rem",
  overflowY: "scroll",
  fontFamily: "'Roboto Mono', Monaco, monospace;",
  wordWrap: "break-word",
  wordBreak: "break-all",
  whiteSpace: "normal",
});

export const OutputPretty = styled(OutputRaw)({
  color: "#ff4455",
});

export const DividerBox = styled(Box)({
  borderBottom: 1,
  borderColor: "divider",
});

export const StatusButton = styled(Button)(
  ({ selected }: { selected: boolean }) => ({
    backgroundColor: selected ? "#eee" : "#eee",
    "&:hover": {
      backgroundColor: selected ? "#aaa" : "#bbb",
    },
  })
);
