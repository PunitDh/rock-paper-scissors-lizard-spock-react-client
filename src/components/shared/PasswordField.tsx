import { useState } from "react";
import styled from "@emotion/styled";
import { Password, TextFields } from "@mui/icons-material";
import { Theme as MuiTheme, Tooltip } from "@mui/material";
import { WideTextField } from "./styles";

type IconProps = {
  theme?: MuiTheme;
};

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const Icon = styled.span(({ theme }: IconProps) => ({
  position: "absolute",
  right: "5%",
  top: "25%",
  cursor: "pointer",
  "&:hover": {
    color: theme?.palette.primary.main,
  },
}));

const PasswordField = (props: any): React.ReactNode => {
  const [show, setShow] = useState<boolean>(false);
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
