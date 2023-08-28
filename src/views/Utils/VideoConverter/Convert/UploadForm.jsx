import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { languages } from "src/assets";
import { TitledButton } from "src/components/shared/styles";
import { useNotification, useToken } from "src/hooks";
import InputGroup from "./InputGroup";
import { ResponsiveForm } from "../styles";

const FileInput = styled(TextField)({
  display: "none",
});

const Video = styled.video(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.up("md")]: {
    width: 360,
    height: 288,
    aspectRatio: "auto",
  },
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
  marginTop: "1rem",
  width: "100%",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.up("lg")]: {
    justifyContent: "flex-start",
  },
}));

const UploadForm = ({
  subtitles,
  setSubtitles,
  onSubmit,
  loading,
  debugMode,
  setDebugMode,
  resetState,
}) => {
  const fileRef = useRef();
  const handleUpload = () => fileRef.current?.click();
  const [video, setVideo] = useState(null);
  const [request, setRequest] = useState({
    language: "Spanish",
    format: "vtt",
  });
  const notification = useNotification();
  const token = useToken();

  const handleChange = (e) =>
    setRequest((request) => ({ ...request, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video) return notification.error("A video file is required");

    resetState();
    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    formData.append("file", video);
    formData.append("language", request.language);
    formData.append("format", request.format);
    formData.append("sessionId", sessionId);
    if (debugMode && token.decoded.isAdmin) {
      formData.append("debug", debugMode);
    }

    return onSubmit(formData, sessionId)
      .then((data) => setSubtitles(data.payload))
      .catch((data) => notification.error(data.payload));
  };

  return (
    <ResponsiveForm onSubmit={handleSubmit}>
      <InputGroup title="Upload a video:">
        <FormLabel htmlFor="upload-video-file">
          <Tooltip title="Select a video file to upload">
            <Fab color="primary" aria-label="add" onClick={handleUpload}>
              <UploadFile />
            </Fab>
          </Tooltip>
          <FileInput
            name="video"
            type="file"
            id="upload-video-file"
            inputRef={fileRef}
            onChange={(e) => setVideo(e.target.files[0])}
            InputProps={{ accept: "video/mp4,video/x-m4v,video/*" }}
          />
        </FormLabel>
      </InputGroup>

      {video && (
        <InputGroup title="Preview:">
          <Video src={URL.createObjectURL(video)} controls>
            <track
              kind="subtitles"
              label={request.language}
              src={`${process.env.REACT_APP_SERVER_URL}/${subtitles.location}`}
            />
          </Video>
        </InputGroup>
      )}

      <InputGroup title="Select language:">
        <Select
          labelId="subtitle-language"
          id="subtitle-language"
          name="language"
          size="small"
          value={request.language}
          maxRows={6}
          onChange={handleChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </InputGroup>

      <InputGroup title="Select output format:">
        <RadioGroup
          aria-labelledby="subtitle-output-format"
          defaultValue="vtt"
          name="format"
          value={request.format}
          onChange={handleChange}
        >
          <FormControlLabel
            value="vtt"
            control={<Radio />}
            label={
              <span>
                <code>.vtt</code> (Recommended)
              </span>
            }
          />
          <FormControlLabel
            value="srt"
            control={<Radio />}
            label={
              <span>
                <code>.srt</code>
              </span>
            }
          />
        </RadioGroup>
      </InputGroup>

      {token.decoded.isAdmin && (
        <InputGroup title="Debug:">
          <FormControlLabel
            control={
              <Checkbox
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
              />
            }
            label="Debug Mode"
          />
        </InputGroup>
      )}

      <ResponsiveBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <TitledButton
            title={`Generate Subtitles in ${request.language}`}
            variant="contained"
            type="submit"
          >
            Generate Subtitles
          </TitledButton>
        )}
      </ResponsiveBox>
    </ResponsiveForm>
  );
};

export default UploadForm;
