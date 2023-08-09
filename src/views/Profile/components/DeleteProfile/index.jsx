import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { Box, Button } from "@mui/material";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import { useState } from "react";
import DialogContent from "./DialogContent";
import { usePlayer } from "src/hooks";

const RedButton = styled(Button)({
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

const DeleteProfile = () => {
  const [confirm, setConfirm] = useState(false);
  const [value, setValue] = useState();
  const [password, setPassword] = useState("");
  const player = usePlayer();

  const handleClose = (newValue) => {
    setConfirm(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const handleConfirm = () => {
    setConfirm(true);
  };

  const handleSubmit = () => {
    const payload = { password };
    player.deleteProfile(payload);
  };

  return (
    <DashboardCard title="Delete Profile">
      <ConfirmationDialog
        keepMounted
        onConfirm={handleSubmit}
        onCancel={handleClose}
        value={value}
        title={"Delete Profile"}
        confirmBtnText={"Delete Permanently"}
        content={DialogContent({ password, setPassword })}
        open={confirm}
      />
      <Box>
        <RedButton
          type="button"
          color="primary"
          variant="contained"
          size="large"
          onClick={handleConfirm}
        >
          Permanently Delete Profile
        </RedButton>
      </Box>
    </DashboardCard>
  );
};

export default DeleteProfile;