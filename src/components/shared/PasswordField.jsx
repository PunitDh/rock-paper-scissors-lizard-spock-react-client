import styled from "@emotion/styled";
import { Password, TextFields } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { WideTextField } from "./styles";

const Container = styled.div({
  position: "relative",
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
      <WideTextField type={show ? "text" : "password"} {...props} />
      <Tooltip title={show ? "Hide password" : "Show password"}>
        <Icon onClick={() => setShow((show) => !show)}>
          {show ? <TextFields /> : <Password />}
        </Icon>
      </Tooltip>
    </Container>
  );
};

export default PasswordField;
