import styled from "@emotion/styled";
import { Paper, Tooltip } from "@mui/material";

const Container = styled(Paper)({
  borderRadius: "50%",
  width: "3.5rem",
  height: "3.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  "&:active": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

type Props = {
  Icon: any;
  color: string;
  title: string;
  onClick: () => void;
};

const ActionButton = ({ Icon, color, title, onClick }: Props): JSX.Element => (
  <Tooltip title={title}>
    <Container elevation={7} onClick={onClick}>
      {<Icon style={{ width: "2rem", height: "2rem", color }} />}
    </Container>
  </Tooltip>
);

export default ActionButton;
