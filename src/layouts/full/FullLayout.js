import { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import { useNotification, usePlayer, useToken } from "src/hooks";
import Notification from "src/components/shared/Notification";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const token = useToken();
  const notification = useNotification();
  const player = usePlayer();

  useEffect(() => {
    if (token.decoded) {
      player.getConversations();
    }
  }, []);

  if (!token.decoded) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Notification notification={notification} />
      <MainWrapper className="mainwrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <PageWrapper className="page-wrapper">
          <Header
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          <Container
            sx={{
              paddingTop: "20px",
              maxWidth: "1200px",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              <Outlet />
            </Box>
          </Container>
          <Footer />
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
