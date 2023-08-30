import { TextField } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { CalculatorBox } from "./styles";
import { useToken } from "src/hooks";

const IOBox = ({ state }) => {
  const token = useToken();
  return (
    <CalculatorBox width="100%">
      <FlexBox flexDirection="column" gap="0.5rem" width="100%">
        <TextField
          autoComplete="off"
          sx={{ width: "100%" }}
          value={state.input}
          inputProps={{ style: { textAlign: "right" } }}
          autoFocus={true}
        />
        {token.decoded.isAdmin && (
          <TextField
            autoComplete="off"
            sx={{ width: "100%" }}
            value={state.debugValue}
            inputProps={{ style: { textAlign: "right" } }}
            autoFocus={true}
          />
        )}
        <TextField
          autoComplete="off"
          sx={{ width: "100%" }}
          value={state.output}
          inputProps={{ style: { textAlign: "right" } }}
          readOnly={true}
        />
      </FlexBox>
    </CalculatorBox>
  );
};

export default IOBox;
