import { DoneOutline } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import { useEffect } from "react";
import { useSocket } from "src/hooks";
import InputGroup from "./InputGroup";
import { SocketResponse } from "src/utils/constants";

const ProgressUpdate = ({ updates, setUpdates }) => {
  const socket = useSocket();

  useEffect(() => {
    socket.on(SocketResponse.PROGRESS_UPDATE, (update) =>
      setUpdates((updates) => updates.concat(update))
    );

    return () => {
      socket.off(SocketResponse.PROGRESS_UPDATE);
    };
  }, []);

  return (
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
  );
};

export default ProgressUpdate;
