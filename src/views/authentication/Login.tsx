import { Link } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import AuthLogin from "./auth/AuthLogin";
import { AuthBox } from "./styles";
import PageContainer from "../../components/container/PageContainer";
import Logo from "../../components/shared/Logo";
import { AuthPage } from "../../utils/constants";

const Login = (): React.ReactNode => (
  <PageContainer title="Login" description="Login page">
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
            <AuthLogin
              subtitle={
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={3}
                >
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                  >
                    Don't have an account?
                  </Typography>
                  <Typography
                    component={Link}
                    to={AuthPage.registerWithReferrer()}
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Create an account
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

export default Login;
