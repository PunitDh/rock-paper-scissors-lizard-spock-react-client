import React from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Bold, FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";
import { setContentType } from "../../../actions";
import { ContentTypeMenuItems } from "./constants";

const StyledFormControl = styled(FormControl)({
  flexDirection: "row",
});

const InputContainer = styled(RadioGroup)({
  marginTop: "1rem",
  width: "100%",
});

export default function Body({ state, dispatch, value }) {
  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(setContentType(e.target.value));
  };

  const { Component } = ContentTypeMenuItems[state.contentType];

  return (
    <CustomTabPanel value={value} index={3}>
      <Bold>Body</Bold>
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
            {Object.keys(ContentTypeMenuItems).map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={ContentTypeMenuItems[type].label}
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
