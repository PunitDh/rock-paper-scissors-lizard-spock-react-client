import CustomTabPanel from "../../../components/CustomTabPanel";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import styled from "@emotion/styled";
import { setContentType } from "../../../actions";
import { ContentTypeMenuItems } from "../../../constants";
import FlexBox from "../../../../../../../components/shared/FlexBox";
import { Bold } from "../../../../../../../components/shared/styles";
import { Dispatch } from "react";
import { Action, State } from "../../../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
  value: number;
  tabId: string;
};

const StyledFormControl = styled(FormControl)({
  flexDirection: "row",
});

const InputContainer = styled(RadioGroup)({
  marginTop: "1rem",
  width: "100%",
});

export default function Body({ state, dispatch, value, tabId }: Props): React.ReactNode {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContentType(e.target.value));
  };

  const { Component } = ContentTypeMenuItems[state.request.contentType];

  return (
    <CustomTabPanel value={value} index={3} tabId={tabId}>
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
            value={state.request.contentType}
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
