import { useMediaQuery, Box, Drawer, Theme } from "@mui/material";
import Logo from "../../../components/shared/Logo";
import SidebarItems from "./SidebarItems";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useAPI } from "../../../hooks";

type Props = {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
};

type WideBoxProps = {
  width: string;
};

const WideBox = styled(Box)(({ width }: WideBoxProps) => ({
  width,
  flexShrink: 0,
}));

const Sidebar = ({
  isSidebarOpen,
  isMobileSidebarOpen,
  onSidebarClose,
}: Props): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const api = useAPI();
  const sidebarWidth = "270px";

  useEffect(() => {
    api.getCurrentGames();
  }, []);

  if (lgUp) {
    return (
      <WideBox width={sidebarWidth}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
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
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
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
      <SidebarItems closeSideBar={onSidebarClose} />
    </Drawer>
  );
};

export default Sidebar;
