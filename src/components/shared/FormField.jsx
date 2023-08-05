import { Typography } from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import { camelCase, kebabCase } from "lodash";
import PasswordField from "./PasswordField";

const FormField = ({ value, label, type = "text", name, id }) => {
  const autoId = kebabCase(label);
  const autoName = camelCase(label);

  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        component="label"
        htmlFor={id || autoId}
        mb="5px"
        mt="25px"
      >
        {label}
      </Typography>

      {type === "password" ? (
        <PasswordField id={id || autoId} name={name || autoName} />
      ) : (
        <CustomTextField
          id={id || autoId}
          name={name || autoName}
          type={type}
          variant="outlined"
          defaultValue={value}
        />
      )}
    </>
  );
};

export default FormField;
