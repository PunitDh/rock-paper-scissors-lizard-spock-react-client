import styled from "@emotion/styled";
import { Download, UploadFile } from "@mui/icons-material";
import {
  CircularProgress,
  Fab,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { api } from "src/api";
import DashboardCard from "src/components/shared/DashboardCard";
import { FlexBox, TitledButton } from "src/components/shared/styles";
import { useNotification } from "src/hooks";

const FileInput = styled(Input)({
  display: "none",
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
  const notification = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    formData.append("language", language);
    setLoading(true);
    api
      .translateSubtitles(formData)
      .then((response) => {
        setLoading(false);
        setSubtitles(response.data);
      })
      .catch(notification.error);
  };

  return (
    <DashboardCard title="Video Subtitle Translator">
      <form onSubmit={handleSubmit}>
        <FlexBox flexDirection="column" gap="2rem" alignItems="flex-start">
          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Select video to upload</Typography>
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
              />
            </FormLabel>
          </FlexBox>

          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            {video && (
              <>
                <Typography variant="h6">Preview</Typography>
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  width={300}
                  height={200}
                />
              </>
            )}
          </FlexBox>

          <FlexBox gap="1rem" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">
              Select language to translate to
            </Typography>
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
          </FlexBox>

          <TitledButton
            title={`Generate Subtitles in ${language}`}
            variant="contained"
            type="submit"
          >
            Generate Subtitles in {language}
          </TitledButton>

          <FlexBox gap="1rem">
            {loading ? (
              <CircularProgress />
            ) : subtitles.translation ? (
              <FlexBox
                flexDirection="column"
                gap="1rem"
                alignItems="flex-start"
              >
                <Typography variant="h6">Output</Typography>
                <textarea
                  rows={15}
                  cols={50}
                  defaultValue={subtitles.translation}
                ></textarea>
                <Typography variant="h6">
                  Download Subtitles as a <code>.srt</code> file
                </Typography>
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
