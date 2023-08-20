import { DoneOutline } from "@mui/icons-material";
import { List, ListItem, ListItemAvatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSocket } from "src/hooks";
import InputGroup from "./components/InputGroup";

const ProgressUpdate = () => {
  const [updates, setUpdates] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on("update-progress", (update) =>
      setUpdates((updates) => updates.concat(update))
    );

    return () => {
      socket.off("update-progress");
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
