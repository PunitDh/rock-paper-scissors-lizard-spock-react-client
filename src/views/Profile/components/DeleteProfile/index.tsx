import { useState } from "react";
import styled from "@emotion/styled";
import DashboardCard from "../../../../components/shared/DashboardCard";
import { Box } from "@mui/material";
import DialogContent from "./DialogContent";
import TitledButton from "../../../../components/shared/TitledButton";
import { useAPI } from "../../../../hooks";
import ConfirmationDialog from "../../../../components/shared/ConfirmationDialog";

const RedButton = styled(TitledButton)({
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "darkred",
  },
});

const DeleteProfile = (): JSX.Element => {
  const api = useAPI();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [password, setPassword] = useState<string>("");

  const handleClose = (newValue: string) => {
    setConfirm(false);
    newValue && setValue(newValue);
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
          <>Permanently Delete Profile</>
        </RedButton>
      </Box>
    </DashboardCard>
  );
};

export default DeleteProfile;
