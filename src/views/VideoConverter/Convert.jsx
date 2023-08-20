import styled from "@emotion/styled";
import { Download, UploadFile } from "@mui/icons-material";
import {
  CircularProgress,
  Fab,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { languages } from "src/assets";
import DashboardCard from "src/components/shared/DashboardCard";
import { TitledButton } from "src/components/shared/styles";
import { useNotification, useSocket } from "src/hooks";
import InputGroup from "./components/InputGroup";
import {
  IndentedBox,
  ResponsiveFlexBox,
  ResponsiveTextField,
  ResponsiveTypography,
} from "./styles";
import useAPI from "src/hooks/useAPI";
import ProgressUpdate from "./ProgressUpdate";

const FileInput = styled(TextField)({
  display: "none",
});

const Convert = () => {
  const fileRef = useRef();
  const handleUpload = () => fileRef.current?.click();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subtitles, setSubtitles] = useState({});
  const [language, setLanguage] = useState("Spanish");
  const notification = useNotification();
  const socket = useSocket();
  const api = useAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video || !language) {
      return notification.error("A video file is required");
    }
    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    socket.emit("request-progress-update", sessionId);
    formData.append("file", video);
    formData.append("language", language);
    formData.append("sessionId", sessionId);
    setLoading(true);
    api
      .translateSubtitles(formData)
      .then((data) => {
        setLoading(false);
        setSubtitles(data);
      })
      .catch(notification.error);
  };

  return (
    <DashboardCard
      sx={{ height: "100%" }}
      title="Generate Subtitles in Any Language"
    >
      <form onSubmit={handleSubmit}>
        <ResponsiveFlexBox flexDirection="column" gap="2rem">
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
              <video src={URL.createObjectURL(video)} controls height={200} />
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

          <InputGroup>
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
          </InputGroup>

          {(loading || subtitles.translation) && <ProgressUpdate />}

          {subtitles.translation && (
            <ResponsiveFlexBox flexDirection="column" gap="1rem" width="100%">
              <ResponsiveTypography variant="subtitle1">
                Output:
              </ResponsiveTypography>
              <IndentedBox>
                <ResponsiveTextField
                  label="Subtitles"
                  multiline
                  minRows={15}
                  InputProps={{ style: { fontFamily: "monospace" } }}
                  defaultValue={subtitles.translation}
                />
              </IndentedBox>

              <ResponsiveTypography variant="subtitle1">
                Download Subtitles as a <code>.srt</code> file
              </ResponsiveTypography>
              <IndentedBox>
                <Tooltip title="Download subtitles file">
                  <a
                    href={`${process.env.REACT_APP_SERVER_URL}/${subtitles.location}`}
                    download
                  >
                    <Fab color="primary" aria-label="add">
                      <Download />
                    </Fab>
                  </a>
                </Tooltip>
              </IndentedBox>

              <ResponsiveTypography variant="subtitle1" bold>
                Note: Files will only be stored on the server for 24 hours.
              </ResponsiveTypography>
            </ResponsiveFlexBox>
          )}
        </ResponsiveFlexBox>
      </form>
    </DashboardCard>
  );
};

export default Convert;
