import { useMediaQuery, Box, Drawer } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import { useEffect } from "react";
import { useGame } from "src/hooks";
import styled from "@emotion/styled";

const WideBox = styled(Box)(({ width }) => ({
  width,
  flexShrink: 0,
}));

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const game = useGame();
  const sidebarWidth = "270px";

  useEffect(() => {
    game.getCurrentGames();
  }, []);

  if (lgUp) {
    return (
      <WideBox width={sidebarWidth}>
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box px={3}>
              <Logo />
            </Box>
            <Box>
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </WideBox>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
