import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../components/shared/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/Dashboard")));
const VideoConverter = Loadable(
  lazy(() => import("../views/Utils/VideoConverter"))
);
const ColorConverter = Loadable(
  lazy(() => import("../views/Utils/ColorPicker"))
);
const RpslsHome = Loadable(lazy(() => import("../views/Games/Rpsls")));
const TicTacToeHome = Loadable(lazy(() => import("../views/Games/TicTacToe")));
const Games = Loadable(lazy(() => import("../views/Games")));
const Utils = Loadable(lazy(() => import("../views/Utils")));
const RpslsGameWindow = Loadable(
  lazy(() => import("../views/Games/Rpsls/GameWindow"))
);
const Profile = Loadable(lazy(() => import("../views/Profile")));

const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage"))
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const Logout = Loadable(lazy(() => import("../views/authentication/Logout")));

const Router = [
  {
    path: "",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="/games" /> },
      { path: "dashboard", exact: true, element: <Dashboard /> },
      { path: "video", exact: true, element: <VideoConverter /> },
      { path: "profile", exact: true, element: <Profile /> },
      { path: "ui/typography", exact: true, element: <TypographyPage /> },
      { path: "ui/shadow", exact: true, element: <Shadow /> },
    ],
  },
  {
    path: "games",
    element: <FullLayout />,
    children: [
      { path: "", element: <Games /> },
      { path: "rpsls", exact: true, element: <RpslsHome /> },
      { path: "tictactoe", exact: true, element: <TicTacToeHome /> },
      { path: ":gameId", exact: true, element: <RpslsGameWindow /> },
    ],
  },
  {
    path: "utils",
    element: <FullLayout />,
    children: [
      { path: "", element: <Utils /> },
      { path: "video", exact: true, element: <VideoConverter /> },
      { path: "color", exact: true, element: <ColorConverter /> },
    ],
  },
  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
    ],
  },
  { path: "*", element: <Navigate to="/auth/404" /> },
];

export default Router;
