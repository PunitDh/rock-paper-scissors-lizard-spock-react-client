import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { Box } from "@mui/material";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import { useState } from "react";
import DialogContent from "./DialogContent";
import { usePlayer } from "src/hooks";
import { TitledButton } from "src/components/shared/styles";

const RedButton = styled(TitledButton)({
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

  const handleConfirm = () => setConfirm(true);
  const handleSubmit = () => player.deleteProfile({ password });

  return (
    <DashboardCard title="Delete Profile">
      <ConfirmationDialog
        keepMounted
        onConfirm={handleSubmit}
        onCancel={handleClose}
        value={value}
        title="Delete Profile"
        confirmBtnText="Delete Permanently"
        content={DialogContent({ password, setPassword })}
        open={confirm}
      />
      <Box>
        <RedButton
          title="Permanently delete your profile"
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
