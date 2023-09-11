import styled from "@emotion/styled";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const DeleteIcon = styled(Delete)(({ theme }) => ({
  cursor: "pointer",
  color: "#aaa",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const DeleteButton = () => {
  return (
    <Tooltip title="Delete">
      <DeleteIcon />
    </Tooltip>
  );
};

export default DeleteButton;
