import React from "react";
import { Box, Typography, Button } from "@mui/material";

import { Stack } from "@mui/system";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";

import { isSuccess } from "src/utils";
import { useAuth } from "src/hooks/useAuth";

const AuthRegister = ({ title, subtitle, subtext }) => {
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
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
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <CustomTextField
              name="name"
              id="name"
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
