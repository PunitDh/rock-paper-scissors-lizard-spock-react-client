import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/Dashboard")));
const VideoConverter = Loadable(lazy(() => import("../views/VideoConverter")));
const NewGame = Loadable(lazy(() => import("../views/NewGame")));
const Game = Loadable(lazy(() => import("../views/Game")));
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
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/games" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/video", exact: true, element: <VideoConverter /> },
      { path: "/games", exact: true, element: <NewGame /> },
      { path: "/games/:gameId", exact: true, element: <Game /> },
      { path: "/profile", exact: true, element: <Profile /> },
      { path: "/ui/typography", exact: true, element: <TypographyPage /> },
      { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/logout", element: <Logout /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
