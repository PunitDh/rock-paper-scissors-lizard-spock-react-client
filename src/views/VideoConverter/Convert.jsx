import styled from "@emotion/styled";
import { UploadFile } from "@mui/icons-material";
import {
  Button,
  Fab,
  FormLabel,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { uploadFile } from "src/api/uploadFile";
import DashboardCard from "src/components/shared/DashboardCard";

const FileInput = styled(Input)({
  display: "none",
});

const Convert = () => {
  const fileRef = useRef();
  const handleUpload = () => fileRef.current?.click();
  const [video, setVideo] = useState(null);

  console.log(video);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    uploadFile(formData);
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
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </DashboardCard>
  );
};

export default Convert;
