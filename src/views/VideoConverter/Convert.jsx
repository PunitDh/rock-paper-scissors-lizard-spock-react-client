import { useState } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { useLoading } from "src/hooks";
import { ResponsiveFlexBox } from "./styles";
import useAPI from "src/hooks/useAPI";
import ProgressUpdate from "./components/ProgressUpdate";
import Output from "./components/Output";
import UploadForm from "./components/UploadForm";

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
        {(loading || subtitles.translation) && <ProgressUpdate />}
        {subtitles.translation && <Output subtitles={subtitles} />}
      </ResponsiveFlexBox>
    </DashboardCard>
  );
};

export default Convert;
