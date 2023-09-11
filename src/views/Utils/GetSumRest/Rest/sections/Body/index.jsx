import React from "react";
import CustomTabPanel from "../../components/CustomTabPanel";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";
import { setContentType } from "../../actions";
import { ContentType } from "./constants";

const StyledFormControl = styled(FormControl)({
  flexDirection: "row",
});

const InputContainer = styled(RadioGroup)({
  marginTop: "1rem",
  width: "100%",
});

export default function Body({ state, dispatch, value }) {
  const handleChange = (e) => {
    dispatch(setContentType(e.target.value));
  };

  const Component = ContentType.find(
    (type) => type.id === state.contentType
  )?.Component;

  return (
    <CustomTabPanel value={value} index={3}>
      <Bold>Body</Bold>
      <button type="button" onClick={() => console.log(state)}>
        Show State
      </button>
      <FlexBox
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        marginTop="1rem"
        backgroundColor="rgba(220,220,220,0.1)"
        width="100%"
        padding="0.5rem"
      >
        <StyledFormControl>
          <RadioGroup
            aria-labelledby="body-type"
            value={state.contentType}
            name="body-type-group"
            row
            onChange={handleChange}
          >
            {ContentType.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id}
                control={<Radio />}
                label={type.label}
              />
            ))}
          </RadioGroup>
        </StyledFormControl>
        <InputContainer>
          {Component && <Component state={state} dispatch={dispatch} />}
        </InputContainer>
      </FlexBox>
    </CustomTabPanel>
  );
}
