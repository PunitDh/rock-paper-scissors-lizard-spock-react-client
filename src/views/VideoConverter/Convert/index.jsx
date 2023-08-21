import { useState } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { useLoading } from "src/hooks";
import { ResponsiveFlexBox } from "../styles";
import useAPI from "src/hooks/useAPI";
import UploadForm from "./UploadForm";
import OutputGroup from "./OutputGroup";

const Convert = () => {
  const [subtitles, setSubtitles] = useState({});
  const api = useAPI();
  const [translateSubtitles, loading] = useLoading(api.translateSubtitles);

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
        <UploadForm
          setSubtitles={setSubtitles}
          onSubmit={translateSubtitles}
          loading={loading}
        />
        <OutputGroup subtitles={subtitles} loading={loading} />
      </ResponsiveFlexBox>
    </DashboardCard>
  );
};

export default Convert;
