import styled from "@emotion/styled";
import { Download, UploadFile } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Fab,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { api } from "src/api";
import DashboardCard from "src/components/shared/DashboardCard";
import { FlexBox } from "src/components/shared/styles";
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
      .uploadFile(formData)
      .then((response) => {
        setLoading(false);
        setSubtitles(response.data);
      })
      .catch(notification.error);
  };

  return (
    <DashboardCard title="Video Converter">
      <form onSubmit={handleSubmit}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormLabel htmlFor="upload-video-file">
                  <Tooltip title="Select a video file to upload">
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={handleUpload}
                    >
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {video && (
                  <video
                    src={URL.createObjectURL(video)}
                    controls
                    width={300}
                    height={200}
                  />
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Select
                  labelId="language"
                  id="language"
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
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {loading ? (
                  <CircularProgress />
                ) : subtitles.translation ? (
                  <FlexBox
                    flexDirection="column"
                    gap="1rem"
                    alignItems="flex-start"
                  >
                    <textarea
                      rows={15}
                      cols={50}
                      defaultValue={subtitles.translation}
                    ></textarea>
                    <Tooltip title="Download subtitles file">
                      <a href={`${subtitles.savedFile}`} download>
                        <Fab color="primary" aria-label="add">
                          <Download />
                        </Fab>
                      </a>
                    </Tooltip>
                  </FlexBox>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </DashboardCard>
  );
};

export default Convert;
