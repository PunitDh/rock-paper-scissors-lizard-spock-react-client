import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { ErrorImg } from "../../assets";

const Error = (): JSX.Element => (
  <Box
    display="flex"
    flexDirection="column"
    height="100dvh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img
        src={ErrorImg}
        alt="404"
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <Typography align="center" variant="h1" mb={4}>
        Oops!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        This page you are looking for could not be found.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/"
        disableElevation
      >
        Go Back to Home
      </Button>
    </Container>
  </Box>
);

export default Error;
