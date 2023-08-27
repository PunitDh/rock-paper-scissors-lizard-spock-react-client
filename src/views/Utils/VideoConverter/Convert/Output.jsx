import axios from "axios";
import { useSocket } from "src/hooks";
import { SocketResponse } from "src/utils/constants";
import { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import { DoneOutline } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { Bold } from "src/components/shared/styles";
import {
  IndentedBox,
  ResponsiveFlexBox,
  ResponsiveTextField,
  ResponsiveTypography,
} from "../styles";

const Output = ({ updates, setUpdates, subtitles, loading, debugMode }) => {
  const socket = useSocket();
  const [downloadBlob, setDownloadBlob] = useState();

  useEffect(() => {
    if (subtitles.location && !debugMode) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/${subtitles.location}`, {
          responseType: "blob",
        })
        .then((response) =>
          setDownloadBlob(URL.createObjectURL(response.data))
        );
    }
  }, [subtitles.location]);

  useEffect(() => {
    socket.on(SocketResponse.PROGRESS_UPDATE, (update) =>
      setUpdates((updates) => updates.concat(update))
    );

    return () => {
      socket.off(SocketResponse.PROGRESS_UPDATE);
    };
  }, []);

  return (
    <>
      {(loading || subtitles.translation) && (
        <InputGroup title="Progress Update:">
          <List dense={false}>
            {updates.map((update) => (
              <ListItem key={update} variant="body-2">
                <ListItemAvatar>
                  <DoneOutline sx={{ color: "green" }} />
                </ListItemAvatar>
                {update}
              </ListItem>
            ))}
          </List>
        </InputGroup>
      )}

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
            Download Subtitles as a <code>.{subtitles.format}</code> file
          </ResponsiveTypography>
          <IndentedBox>
            <Tooltip title="Download subtitles file">
              {downloadBlob && (
                <a href={downloadBlob} download={subtitles.location}>
                  <Fab color="primary" aria-label="add">
                    <Download />
                  </Fab>
                </a>
              )}
            </Tooltip>
          </IndentedBox>

          <ResponsiveTypography variant="subtitle1">
            <Bold>Note: Files will be stored on the server for 24 hours.</Bold>
          </ResponsiveTypography>
        </ResponsiveFlexBox>
      )}
    </>
  );
};

export default Output;
