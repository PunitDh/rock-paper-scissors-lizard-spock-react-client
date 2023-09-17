import { useReducer } from "react";
import UploadForm from "./UploadForm";
import Output from "./Output";
import { reducer, initialState } from "./reducer";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { ResponsiveFlexBox } from "../../../../components/shared/styles";

const Convert = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DashboardCard
      sx={{ height: "100%" }}
      title="Generate Subtitles in Any Language"
    >
      <ResponsiveFlexBox
        flexDirection="column"
        gap="2rem"
        alignItems="flex-start"
      >
        <UploadForm state={state} dispatch={dispatch} />
        <Output state={state} dispatch={dispatch} />
      </ResponsiveFlexBox>
    </DashboardCard>
  );
};

export default Convert;
