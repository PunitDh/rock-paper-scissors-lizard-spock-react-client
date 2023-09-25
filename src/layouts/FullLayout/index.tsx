import { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAPI, useNotification, useToken } from "../../hooks";
import { AuthPage } from "../../utils/constants";
import Notification from "../../components/shared/Notification";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100dvh",
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
  const api = useAPI();

  const closeSideBar = () => setMobileSidebarOpen(false);

  useEffect(() => {
    if (token.decoded) {
      api.getConversations();
    }
  }, []);

  if (!token.decoded) {
    console.log("It's the full layout page");
    return <Navigate to={AuthPage.loginWithReferrer()} />;
  }

  return (
    <>
      <Notification notification={notification} />
      <MainWrapper className="mainwrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={closeSideBar}
        />
        <PageWrapper className="page-wrapper">
          <Header
            // toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          />
          <Container
            sx={{
              paddingTop: "20px",
              maxWidth: "1200px",
            }}
          >
            <Box sx={{ minHeight: "calc(100dvh - 170px)" }}>
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
