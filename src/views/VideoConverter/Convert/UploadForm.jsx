import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Fab,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { languages } from "src/assets";
import { TitledButton } from "src/components/shared/styles";
import { useNotification, useSocket } from "src/hooks";
import InputGroup from "./InputGroup";
import { ResponsiveForm } from "../styles";
import { SocketRequest } from "src/utils/constants";

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

const UploadForm = ({ setSubtitles, onSubmit, loading }) => {
  const fileRef = useRef();
  const handleUpload = () => fileRef.current?.click();
  const [video, setVideo] = useState(null);
  const [language, setLanguage] = useState("Spanish");
  const notification = useNotification();
  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video || !language) {
      return notification.error("A video file is required");
    }
    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    socket.emit(SocketRequest.PROGRESS_UPDATE, sessionId);
    formData.append("file", video);
    formData.append("language", language);
    formData.append("sessionId", sessionId);

    return onSubmit(formData).then(setSubtitles).catch(notification.error);
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
          <Video src={URL.createObjectURL(video)} controls />
        </InputGroup>
      )}

      <InputGroup title="Select language:">
        <Select
          labelId="subtitle-language"
          id="subtitle-language"
          name="language"
          size="small"
          value={language}
          maxRows={6}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </InputGroup>

      <ResponsiveBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <TitledButton
            title={`Generate Subtitles in ${language}`}
            variant="contained"
            type="submit"
          >
            Generate Subtitles in {language}
          </TitledButton>
        )}
      </ResponsiveBox>
    </ResponsiveForm>
  );
};

export default UploadForm;
