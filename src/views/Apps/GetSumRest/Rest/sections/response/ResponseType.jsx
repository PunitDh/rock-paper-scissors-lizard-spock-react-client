
import FlexBox from "../../../../../../components/shared/FlexBox";
import { setOutputDisplayType } from "../../actions";
import { DisplayType } from "../../constants";
import { StatusButton } from "../../styles";

const ResponseType = ({ state, dispatch }) => {
  const handleSetDisplayType = (displayType) => () =>
    dispatch(setOutputDisplayType(displayType));

  return (
    <FlexBox width="100%" justifyContent="space-between">
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
    </FlexBox>
  );
};

export default ResponseType;
