import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  FormControlLabel,
  FormLabel,
  InputProps,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { Dispatch, useRef } from "react";
import InputGroup from "./InputGroup";
import { ResponsiveForm } from "../styles";
import {
  resetOutput,
  setLoading,
  setFormat,
  setVideo,
  setDownloadBlob,
} from "./actions";
import { useAPI, useNotification } from "../../../../hooks";
import { Action, AudioFormat, State } from "../types";

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

const UploadForm = ({ dispatch, state }: Props): React.ReactNode => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const notification = useNotification();
  const api = useAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.video) return notification.error("A video file is required");
    dispatch(resetOutput());

    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    formData.append("file", state.video);
    formData.append("format", state.format);
    formData.append("sessionId", sessionId);

    dispatch(setLoading(true));

    return api
      .extractAudio(formData, sessionId)
      .then((data) => dispatch(setDownloadBlob(data.payload)))
      .catch((data) => {
        dispatch(setLoading(false));
        notification.error(data.payload);
      });
  };

  const handleSetFormat = (e: SelectChangeEvent) =>
    dispatch(setFormat(e.target.value as AudioFormat));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setVideo((e.target as HTMLInputElement).files![0]));

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
          <Video src={URL.createObjectURL(state.video)} controls />
        </InputGroup>
      )}

      <InputGroup title="Select output format:">
        <RadioGroup
          aria-labelledby="subtitle-output-format"
          defaultValue="mp3"
          name="format"
          value={state.format}
          onChange={handleSetFormat}
        >
          <FormControlLabel
            value="mp3"
            control={<Radio />}
            label={
              <span>
                <code>.mp3</code> (Recommended)
              </span>
            }
          />
        </RadioGroup>
      </InputGroup>

      <ResponsiveBox>
        {state.loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" type="submit">
            Extract Audio
          </Button>
        )}
      </ResponsiveBox>
    </ResponsiveForm>
  );
};

export default UploadForm;
