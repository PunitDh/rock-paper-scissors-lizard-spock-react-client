import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import useAuth from "src/hooks/useAuth";

const AuthRegister = ({ title, subtitle, subtext }) => {
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = e.target;
    const payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    auth.register(payload);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="firstName"
              mb="5px"
            >
              First Name
            </Typography>

            <CustomTextField
              name="firstName"
              id="firstName"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="lastName"
              mb="5px"
            >
              Last Name
            </Typography>
            <CustomTextField
              name="lastName"
              id="lastName"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
              mt="25px"
            >
              Email Address
            </Typography>
            <CustomTextField
              name="email"
              id="email"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="confirm-password"
              mb="5px"
              mt="25px"
            >
              Confirm Password
            </Typography>
            <CustomTextField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Stack>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
