import { Dispatch, useEffect } from "react";
import InputGroup from "./InputGroup";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import { DoneOutline } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { IndentedBox, ResponsiveTypography } from "../styles";
import { setDownloadBlob, addProgressUpdate } from "./actions";
import { SocketResponse } from "../../../../utils/constants";
import { Bold, ResponsiveFlexBox } from "../../../../components/shared/styles";
import { useAPI, useSocket } from "../../../../hooks";
import { Action, State } from "../types";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
};

const Output = ({ state, dispatch }: Props): React.ReactNode => {
  const socket = useSocket();
  const api = useAPI();

  useEffect(() => {
    if (state.audio) {
      api
        .getDownloadFile(state.audio.location)
        .then((response) => dispatch(setDownloadBlob(response.data)));
    }
  }, [api, dispatch, state.audio]);

  useEffect(() => {
    socket.on(SocketResponse.PROGRESS_UPDATE, (update) =>
      dispatch(addProgressUpdate(update))
    );

    return () => {
      socket.off(SocketResponse.PROGRESS_UPDATE);
    };
  }, []);

  return (
    <>
      {(state.loading || state.audio) && (
        <InputGroup title="Progress Update:">
          <List dense={false}>
            {state.updates.map((update) => (
              <ListItem key={update}>
                <ListItemAvatar>
                  <DoneOutline sx={{ color: "green" }} />
                </ListItemAvatar>
                {update}
              </ListItem>
            ))}
          </List>
        </InputGroup>
      )}

      {state.audio && (
        <ResponsiveFlexBox flexDirection="column" gap="1rem" width="100%">
          <ResponsiveTypography variant="subtitle1">
            Output:
          </ResponsiveTypography>

          <ResponsiveTypography variant="subtitle1">
            Download Subtitles as a <code>.{state.audio.format}</code> file
          </ResponsiveTypography>
          <IndentedBox>
            <Tooltip title="Download audio file">
              {state.downloadBlob ? (
                <a href={state.downloadBlob} download={state.audio.location}>
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
