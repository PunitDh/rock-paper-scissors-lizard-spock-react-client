import { useAPI, useSocket } from "src/hooks";
import { SocketResponse } from "src/utils/constants";
import { useEffect } from "react";
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
import { setDownloadBlob, setProgressUpdate } from "./actions";

const Output = ({ state, dispatch }) => {
  const socket = useSocket();
  const api = useAPI();

  useEffect(() => {
    if (state.subtitles.location && !state.debugMode) {
      api
        .getDownloadFile(state.subtitles.location)
        .then((response) => dispatch(setDownloadBlob(response.data)));
    }
  }, [state.subtitles.location]);

  useEffect(() => {
    socket.on(SocketResponse.PROGRESS_UPDATE, (update) =>
      dispatch(setProgressUpdate(update))
    );

    return () => {
      socket.off(SocketResponse.PROGRESS_UPDATE);
    };
  }, []);

  return (
    <>
      {(state.loading || state.subtitles.translation) && (
        <InputGroup title="Progress Update:">
          <List dense={false}>
            {state.updates.map((update) => (
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

      {state.subtitles.translation && (
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
              defaultValue={state.subtitles.translation}
            />
          </IndentedBox>

          <ResponsiveTypography variant="subtitle1">
            Download Subtitles as a <code>.{state.subtitles.format}</code> file
          </ResponsiveTypography>
          <IndentedBox>
            <Tooltip title="Download subtitles file">
              {state.downloadBlob ? (
                <a
                  href={state.downloadBlob}
                  download={state.subtitles.location}
                >
                  <Fab color="primary" aria-label="add">
                    <Download />
                  </Fab>
                </a>
              ) : (
                <></>
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
