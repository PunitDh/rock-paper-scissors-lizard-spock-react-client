import { useReducer } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { ResponsiveFlexBox } from "../styles";
import UploadForm from "./UploadForm";
import Output from "./Output";
import { reducer, initialState } from "./reducer";

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
