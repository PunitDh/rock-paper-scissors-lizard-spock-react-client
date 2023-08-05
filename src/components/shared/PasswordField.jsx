import styled from "@emotion/styled";
import { Password, TextFields } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useState } from "react";

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  width: "100%",
});

const Icon = styled.span(({ theme }) => ({
  position: "absolute",
  right: "5%",
  top: "25%",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const PasswordField = (props) => {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <StyledTextField type={show ? "text" : "password"} {...props} />
      <Icon
        title={show ? "Hide password" : "Show password"}
        onClick={() => setShow((show) => !show)}
      >
        {show ? <TextFields /> : <Password />}
      </Icon>
    </Container>
  );
};

export default PasswordField;
