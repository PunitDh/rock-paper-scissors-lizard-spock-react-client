import styled from "@emotion/styled";
import { Alert, Snackbar } from "@mui/material";
import { isObject } from "src/utils";

const WideAlert = styled(Alert)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const Notification = ({
  notification,
  vertical = "bottom",
  horizontal = "center",
}) =>
  notification.message ? (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={notification.duration}
      open={notification.open}
      onClose={notification.close}
    >
      <WideAlert
        onClose={notification.close}
        variant="filled"
        severity={notification.type}
      >
        {isObject(notification.message)
          ? JSON.stringify(notification.message)
          : notification.message}
      </WideAlert>
    </Snackbar>
  ) : null;

export default Notification;
