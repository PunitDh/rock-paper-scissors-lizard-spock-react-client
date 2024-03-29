import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  FormLabel,
  InputProps,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { Dispatch, useRef, useState } from "react";
import InputGroup from "./InputGroup";
import { ResponsiveForm } from "../styles";
import {
  resetOutput,
  toggleDebugMode,
  setLoading,
  setOption,
  setSubtitles,
  setVideo,
} from "./actions";
import { Languages } from "../../../../assets";
import TitledButton from "../../../../components/shared/TitledButton";
import { useAPI, useNotification, useToken } from "../../../../hooks";
import { Action, State, TaskStatus } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

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

const UploadForm = ({ dispatch, state }: Props): JSX.Element => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timer>();
  const notification = useNotification();
  const token = useToken();
  const api = useAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.video) return notification.error("A video file is required");
    dispatch(resetOutput());

    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    formData.append("file", state.video);
    formData.append("language", state.language);
    formData.append("format", state.format);
    formData.append("sessionId", sessionId);
    if (state.debugMode && token.decoded?.isAdmin) {
      formData.append("debug", String(state.debugMode));
    }

    dispatch(setLoading(true));

    return api
      .translateSubtitles(formData, sessionId)
      .then((data) => {
        console.log(data);
        setPollingInterval(
          setInterval(
            () =>
              api.getSubtitlesTaskStatus(data.payload.id).then((data) => {
                console.log(data.payload.status, data.payload);
                switch (data.payload.status) {
                  case TaskStatus.COMPLETED:
                    setDone(true);
                    dispatch(setSubtitles(data.payload));
                    dispatch(setLoading(false));
                    break;

                  case TaskStatus.ERROR:
                    setDone(true);
                    dispatch(setLoading(false));
                    break;

                  default:
                    setDone(false);
                    break;
                }
              }),
            1000
          )
        );
      })
      .catch((data) => {
        dispatch(setLoading(false));
        notification.error(data.payload);
      });
  };

  const handleSetOption = (e: SelectChangeEvent) =>
    dispatch(setOption(e.target));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setVideo((e.target as HTMLInputElement).files![0]));

  if (done) {
    clearInterval(pollingInterval as any);
  }

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
            onChange={handleUpload}
            InputProps={
              { accept: "video/mp4,video/x-m4v,video/*" } as Partial<InputProps>
            }
          />
        </FormLabel>
      </InputGroup>

      {state.video && (
        <InputGroup title="Preview:">
          <Video
            src={URL.createObjectURL(state.video)}
            controls
            crossOrigin="anonymous"
          >
            {state.subtitles?.location && (
              <track
                kind="captions"
                label={state.language}
                src={`${process.env.REACT_APP_SERVER_URL}/${state.subtitles.location}`}
                default
              />
            )}
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
          onChange={handleSetOption}
        >
          {Languages.map((lang) => (
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
          onChange={handleSetOption}
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

      {token.decoded?.isAdmin && (
        <InputGroup title="Admin:">
          <FormControlLabel
            control={
              <Checkbox
                checked={state.debugMode}
                onChange={() => dispatch(toggleDebugMode())}
              />
            }
            label="Debug Mode"
            sx={{ userSelect: "none" }}
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
