import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { FlexBox } from "src/components/shared/styles";
import { setOutputDisplayType } from "../../actions";
import { DisplayType } from "./constants";

const StatusButton = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? "#bbb" : "#eee",
}));

const StatusBar = ({ state, dispatch }) => {
  const handleSetDisplayType = (displayType) => () =>
    dispatch(setOutputDisplayType(displayType));

  return (
    <FlexBox
      width="100%"
      justifyContent="flex-start"
      gap="0.1rem"
      marginTop="1rem"
    >
      {Object.values(DisplayType).map((displayType) => (
        <StatusButton
          variant="secondary"
          selected={state.response.displayType === displayType}
          onClick={handleSetDisplayType(displayType)}
        >
          {displayType}
        </StatusButton>
      ))}
    </FlexBox>
  );
};

export default StatusBar;
