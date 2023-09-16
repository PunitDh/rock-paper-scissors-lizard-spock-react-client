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

const DeleteButton = ({ onClick }) => (
  <Tooltip title="Delete">
    <DeleteIcon onClick={onClick} />
  </Tooltip>
);

export default DeleteButton;
