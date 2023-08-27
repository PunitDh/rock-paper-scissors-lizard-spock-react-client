import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { Box } from "@mui/material";
import ConfirmationDialog from "src/components/shared/ConfirmationDialog";
import { useState } from "react";
import DialogContent from "./DialogContent";
import { TitledButton } from "src/components/shared/styles";
import { useAPI } from "src/hooks";

const RedButton = styled(TitledButton)({
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

const DeleteProfile = () => {
  const api = useAPI();
  const [confirm, setConfirm] = useState(false);
  const [value, setValue] = useState();
  const [password, setPassword] = useState("");

  const handleClose = (newValue) => {
    setConfirm(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  const handleConfirm = () => setConfirm(true);
  const handleSubmit = () => api.deleteProfile({ password });

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
