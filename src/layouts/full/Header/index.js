import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
} from "@mui/material";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons";
import { useToken } from "src/hooks";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: "70px",
  },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Header = ({ toggleMobileSidebar }) => {
  const token = useToken();
  const [decoded, setDecoded] = useState(token.decoded);

  useEffect(() => {
    setDecoded(jwtDecode(token.jwt));
  }, [token.jwt]);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.main",
            }),
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {decoded.firstName} {decoded.lastName}
          <Profile decoded={decoded} />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
