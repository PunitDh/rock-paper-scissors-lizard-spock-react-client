import React from "react";
import { TextField } from "@mui/material";
import { CalculatorBox } from "../styles";
import { useToken } from "../../../../../hooks";
import FlexBox from "../../../../../components/shared/FlexBox";
import { State } from "../types";

type Props = {
  state: State;
}

const IOBox = ({ state }: Props) => {
  const token = useToken();
  return (
    <CalculatorBox width="100%">
      <FlexBox flexDirection="column" gap="0.5rem" width="100%">
        <TextField
          autoComplete="off"
          sx={{ width: "100%" }}
          value={state.input.join("")}
          inputProps={{ style: { textAlign: "right" } }}
        />
        {token.decoded?.isAdmin && (
          <TextField
            autoComplete="off"
            sx={{ width: "100%" }}
            value={state.parsedInput}
            inputProps={{ style: { textAlign: "right" } }}
          />
        )}
        <TextField
          autoComplete="off"
          sx={{ width: "100%" }}
          value={state.output}
          inputProps={{ style: { textAlign: "right" } }}
          InputProps={{
            readOnly: true,
          }}
        />
      </FlexBox>
    </CalculatorBox>
  );
};

export default IOBox;
