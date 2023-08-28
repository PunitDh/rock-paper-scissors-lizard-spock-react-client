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
import { useRef } from "react";
import { languages } from "src/assets";
import { TitledButton } from "src/components/shared/styles";
import { useAPI, useNotification, useToken } from "src/hooks";
import InputGroup from "./InputGroup";
import { ResponsiveForm } from "../styles";
import {
  resetOutput,
  setDebugMode,
  setFormat,
  setLanguage,
  setLoading,
  setSubtitles,
  setVideo,
} from "./actions";

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

const UploadForm = ({ dispatch, state }) => {
  const fileRef = useRef();
  const notification = useNotification();
  const token = useToken();
  const api = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.video) return notification.error("A video file is required");
    dispatch(resetOutput());

    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    formData.append("file", state.video);
    formData.append("language", state.language);
    formData.append("format", state.format);
    formData.append("sessionId", sessionId);
    if (state.debugMode && token.decoded.isAdmin) {
      formData.append("debug", state.debugMode);
    }

    dispatch(setLoading(true));
    return api
      .translateSubtitles(formData, sessionId)
      .then((data) => dispatch(setSubtitles(data.payload)))
      .catch((data) => notification.error(data.payload));
  };

  const handleFileUpload = (e) => dispatch(setVideo(e.target.files[0]));

  return (
    <ResponsiveForm onSubmit={handleSubmit}>
      <InputGroup title="Upload a video:">
        <FormLabel htmlFor="upload-video-file">
          <Tooltip title="Select a video file to upload">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => fileRef.current?.click()}
            >
              <UploadFile />
            </Fab>
          </Tooltip>
          <FileInput
            name="video"
            type="file"
            id="upload-video-file"
            inputRef={fileRef}
            onChange={handleFileUpload}
            InputProps={{ accept: "video/mp4,video/x-m4v,video/*" }}
          />
        </FormLabel>
      </InputGroup>

      {state.video && (
        <InputGroup title="Preview:">
          <Video src={URL.createObjectURL(state.video)} controls>
            <track
              kind="subtitles"
              label={state.language}
              src={`${process.env.REACT_APP_SERVER_URL}/${state.subtitles.location}`}
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
          value={state.language}
          maxRows={6}
          onChange={(e) => dispatch(setLanguage(e.target.value))}
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
          value={state.format}
          onChange={(e) => dispatch(setFormat(e.target.value))}
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
                checked={state.debugMode}
                onChange={(e) => dispatch(setDebugMode(e.target.checked))}
              />
            }
            label="Debug Mode"
          />
        </InputGroup>
      )}

      <ResponsiveBox>
        {state.loading ? (
          <CircularProgress />
        ) : (
          <TitledButton
            title={`Generate Subtitles in ${state.language}`}
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
