import styled from "@emotion/styled";
import {
  CheckBoxOutlineBlankOutlined,
  DoneOutline,
  Download,
  UploadFile,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Fab,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { api } from "src/api";
import DashboardCard from "src/components/shared/DashboardCard";
import { FlexBox, TitledButton } from "src/components/shared/styles";
import { useNotification, useSocket } from "src/hooks";

const FileInput = styled(TextField)({
  display: "none",
});

const IndentedBox = styled(Box)({
  marginLeft: "2rem",
  width: "100%",
});

const Convert = () => {
  const languages = [
    "Arabic",
    "Bengali",
    "Chinese (Mandarin)",
    "English",
    "French",
    "German",
    "Greek",
    "Hindi",
    "Italian",
    "Japanese",
    "Javanese",
    "Korean",
    "Malay",
    "Marathi",
    "Portuguese",
    "Punjabi",
    "Russian",
    "Spanish",
    "Swahili",
    "Tamil",
    "Telugu",
    "Turkish",
    "Urdu",
    "Vietnamese",
  ];
  const fileRef = useRef();
  const handleUpload = () => fileRef.current?.click();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subtitles, setSubtitles] = useState({});
  const [language, setLanguage] = useState("Spanish");
  const [updates, setUpdated] = useState([]);
  const notification = useNotification();
  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video || !language) {
      return notification.error("A video file is required");
    }
    const formData = new FormData();
    const sessionId = Math.random().toString(36).slice(2, 9);
    socket.emit("request-progress-update", sessionId);
    socket.on("update-progress", (update) => {
      setUpdated((facts) => facts.concat(update));
    });
    formData.append("file", video);
    formData.append("language", language);
    formData.append("sessionId", sessionId);
    setLoading(true);
    api
      .translateSubtitles(formData)
      .then((response) => {
        setLoading(false);
        setSubtitles(response.data);
        socket.off("update-progress");
      })
      .catch(notification.error);
  };

  return (
    <DashboardCard title="Generate Subtitles in Any Language">
      <form onSubmit={handleSubmit}>
        <FlexBox flexDirection="column" gap="2rem" alignItems="flex-start">
          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Upload a video:</Typography>
            <IndentedBox>
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
            </IndentedBox>
          </FlexBox>

          {video && (
            <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
              <Typography variant="h6">Preview:</Typography>
              <IndentedBox>
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  width={300}
                  height={200}
                />
              </IndentedBox>
            </FlexBox>
          )}

          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Select language:</Typography>
            <IndentedBox>
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
            </IndentedBox>
          </FlexBox>

          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            <IndentedBox>
              <TitledButton
                title={`Generate Subtitles in ${language}`}
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>Generate Subtitles in {language}</>
                )}
              </TitledButton>
            </IndentedBox>
          </FlexBox>

          {(loading || subtitles.translation) && (
            <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
              <Typography variant="h6">Progress Update:</Typography>
              <IndentedBox>
                <List dense={false}>
                  {updates.map((update) => (
                    <ListItem variant="body-2">
                      <ListItemAvatar>
                        <DoneOutline sx={{ color: "green" }} />
                      </ListItemAvatar>
                      {update}
                    </ListItem>
                  ))}
                </List>
              </IndentedBox>
            </FlexBox>
          )}

          <FlexBox
            gap="1rem"
            flexDirection="column"
            alignItems="flex-start"
            width="30rem"
          >
            {subtitles.translation ? (
              <FlexBox
                flexDirection="column"
                gap="1rem"
                alignItems="flex-start"
                width="100%"
              >
                <Typography variant="h6">Output</Typography>
                <IndentedBox>
                  <TextField
                    label="Subtitles"
                    multiline
                    minRows={15}
                    sx={{ width: "100%" }}
                    InputProps={{ style: { fontFamily: "monospace" } }}
                    defaultValue={subtitles.translation}
                  />
                </IndentedBox>

                <Typography variant="h6">
                  Download Subtitles as a <code>.srt</code> file
                </Typography>
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

                <Typography variant="h6">
                  Note: Files will only be stored on the server for 24 hours.
                </Typography>
              </FlexBox>
            ) : null}
          </FlexBox>
        </FlexBox>
      </form>
    </DashboardCard>
  );
};

export default Convert;
