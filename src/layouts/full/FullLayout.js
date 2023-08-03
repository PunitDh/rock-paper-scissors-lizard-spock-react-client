import React, { useEffect, useState } from "react";
import { styled, Container, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import { useSocket, useToken } from "src/hooks";
import { useDispatch } from "react-redux";
import { Status, isSuccess } from "src/utils";
import { setCurrentGames } from "src/redux/menuSlice";
import { setCurrentGame } from "src/redux/gameSlice";

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

  const socket = useSocket();
  const token = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.emit("get-current-games", { _jwt: token.jwt });
    socket?.on(Status.UNAUTHORIZED, () => {
      navigate("/auth/login");
    });
    socket?.on("current-games", (response) =>
      isSuccess(response)
        .then((payload) => dispatch(setCurrentGames(payload)))
        .catch(console.error)
    );
    socket?.on("move-played", (response) =>
      isSuccess(response)
        .then((game) => dispatch(setCurrentGame(game)))
        .catch(console.error)
    );
  }, [socket]);

  return (
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
  );
};

export default FullLayout;
