import { useState } from "react";
import ProgressUpdate from "./ProgressUpdate";
import Subtitles from "./Subtitles";

const OutputGroup = ({ subtitles, loading }) => {
  const [updates, setUpdates] = useState([]);

  return (
    <>
      {(loading || subtitles.translation) && (
        <ProgressUpdate updates={updates} setUpdates={setUpdates} />
      )}
      {subtitles.translation && <Subtitles subtitles={subtitles} />}
    </>
  );
};

export default OutputGroup;
