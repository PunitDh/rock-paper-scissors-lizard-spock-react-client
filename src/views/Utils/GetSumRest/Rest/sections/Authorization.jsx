import { MenuItem, Select, Typography } from "@mui/material";
import CustomTabPanel from "../components/CustomTabPanel";
import { Bold, FlexBox } from "src/components/shared/styles";
import styled from "@emotion/styled";
import { setAuthorizationType } from "../actions";
import { AuthorizationType } from "./Body/constants";

const StyledBox = styled.div(({ border }) => ({
  borderRight: border ? "1px solid rgba(0,0,0,0.1)" : 0,
  height: "25rem",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  display: "flex",
  width: "40%",
  flexDirection: "column",
  gap: "0.5rem",
}));

const Authorization = ({ state, dispatch, value }) => {
  const handleChange = (e) => {
    dispatch(setAuthorizationType(e.target.value));
  };

  return (
    <CustomTabPanel value={value} index={1}>
      <Bold>Authorization</Bold>
      <FlexBox
        width="100%"
        gap="1rem"
        justifyContent="flex-start"
        marginTop="1rem"
      >
        <StyledBox border>
          <FlexBox
            width="100%"
            justifyContent="space-between"
            paddingRight="2rem"
          >
            <Typography>Type</Typography>
            <Select
              labelId="method-select"
              id="method-select"
              value={state.authorization.type || "No Auth"}
              onChange={handleChange}
              sx={{ width: "10rem" }}
            >
              {Object.values(AuthorizationType).map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  selected={type === state.authorization.type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FlexBox>
        </StyledBox>
        <StyledBox>Token</StyledBox>
      </FlexBox>
    </CustomTabPanel>
  );
};

export default Authorization;
