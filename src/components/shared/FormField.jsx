import React from "react";
import { Typography } from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { camelCase, kebabCase } from "lodash";
import PasswordField from "./PasswordField";
import styled from "@emotion/styled";

const WideTextField = styled(CustomTextField)({
  width: "100%",
});

const Container = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const FormField = ({
  value,
  label,
  type = "text",
  name,
  id,
  disabled = false,
}) => {
  const autoId = kebabCase(label);
  const autoName = camelCase(label);

  return (
    <Container>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        htmlFor={id || autoId}
        mb="5px"
        mt="1.25rem"
      >
        {label}
      </Typography>

      {type === "password" ? (
        <PasswordField
          id={id || autoId}
          name={name || autoName}
          disabled={disabled}
        />
      ) : (
        <WideTextField
          id={id || autoId}
          name={name || autoName}
          type={type}
          variant="outlined"
          defaultValue={value}
          disabled={disabled}
        />
      )}
    </Container>
  );
};

export default FormField;
