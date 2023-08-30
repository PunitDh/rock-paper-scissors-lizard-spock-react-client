import { TextField } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { CalculatorBox } from "./styles";

const IOBox = ({ state }) => (
  <CalculatorBox width="100%">
    <FlexBox flexDirection="column" gap="0.5rem" width="100%">
      <TextField
        name="input"
        sx={{ width: "100%" }}
        value={state.input}
        inputProps={{ style: { textAlign: "right" } }}
        autoFocus={true}
      />
      <TextField
        name="output"
        sx={{ width: "100%" }}
        value={state.output}
        inputProps={{ style: { textAlign: "right" } }}
        readOnly={true}
      />
    </FlexBox>
  </CalculatorBox>
);

export default IOBox;
