import { Box, AppBar, Toolbar, styled, Stack, IconButton } from "@mui/material";
import CornerProfile from "./CornerProfile";
import { IconMenu } from "@tabler/icons-react";
import NotificationMenu from "./NotificationMenu";
import { useToken } from "../../../hooks";

type Props = {
  toggleMobileSidebar: () => void;
};

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

const Header = ({ toggleMobileSidebar }: Props) => {
  const token = useToken();

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
        <NotificationMenu />
        <Box flexGrow={1} />
        {token.decoded && (
          <Stack spacing={1} direction="row" alignItems="center">
            {token.decoded.firstName} {token.decoded.lastName}
            <CornerProfile decoded={token.decoded} />
          </Stack>
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
