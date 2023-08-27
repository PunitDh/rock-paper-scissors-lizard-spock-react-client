import { useState } from "react";
import DashboardCard from "src/components/shared/DashboardCard";
import { useLoading } from "src/hooks";
import { ResponsiveFlexBox } from "../styles";
import useAPI from "src/hooks/useAPI";
import UploadForm from "./UploadForm";
import Output from "./Output";

const Convert = () => {
  const [subtitles, setSubtitles] = useState({});
  const [debugMode, setDebugMode] = useState(true);
  const [updates, setUpdates] = useState([]);
  const api = useAPI();
  const [translateSubtitles, loading] = useLoading(api.translateSubtitles);
  const resetState = () => {
    setUpdates([]);
    setSubtitles({});
  };

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
          subtitles={subtitles}
          setSubtitles={setSubtitles}
          onSubmit={translateSubtitles}
          loading={loading}
          debugMode={debugMode}
          setDebugMode={setDebugMode}
          resetState={resetState}
        />
        <Output
          subtitles={subtitles}
          loading={loading}
          debugMode={debugMode}
          updates={updates}
          setUpdates={setUpdates}
        />
      </ResponsiveFlexBox>
    </DashboardCard>
  );
};

export default Convert;
