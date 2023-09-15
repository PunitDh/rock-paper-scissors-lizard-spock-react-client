import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";


import AuthRegister from "./auth/AuthRegister";
import { AuthBox } from "./styles";
import PageContainer from "../../components/container/PageContainer";
import Logo from "../../components/shared/Logo";
import { AuthPage } from "../../utils/constants";


const Register = () => (
  <PageContainer title="Register" description="Register page">
    <AuthBox>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100dvh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>
            <AuthRegister
              subtitle={
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={1}
                  mt={3}
                >
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Already have an Account?
                  </Typography>
                  <Typography
                    component={Link}
                    to={AuthPage.LOGIN_PAGE}
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Sign In
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </AuthBox>
  </PageContainer>
);

export default Register;
