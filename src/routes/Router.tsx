import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../components/shared/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/Dashboard")));
const VideoConverter = Loadable(
  lazy(() => import("../views/Apps/VideoConverter")),
);
const ColorPicker = Loadable(lazy(() => import("../views/Apps/ColorPicker")));
const ReactCalculator = Loadable(
  lazy(() => import("../views/Apps/ReactCalculator")),
);
const Spreadsheet = Loadable(lazy(() => import("../views/Apps/Spreadsheet")));
const GetSumRest = Loadable(lazy(() => import("../views/Apps/GetSumRest")));
const Recipes = Loadable(lazy(() => import("../views/Apps/Recipes")));
const Recipe = Loadable(
  lazy(() => import("../views/Apps/Recipes/Picker/components/Recipe")),
);
const RpslsHome = Loadable(lazy(() => import("../views/Apps/Rpsls")));
const TicTacToeHome = Loadable(lazy(() => import("../views/Apps/TicTacToe")));
const Apps = Loadable(lazy(() => import("../views/Apps")));
const Utils = Loadable(lazy(() => import("../views/Apps/VideoConverter")));
const RpslsGameWindow = Loadable(
  lazy(() => import("../views/Apps/Rpsls/GameWindow")),
);
const Profile = Loadable(lazy(() => import("../views/Profile")));

const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage")),
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register")),
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));
const Logout = Loadable(lazy(() => import("../views/authentication/Logout")));

const Router = [
  {
    path: "",
    element: <FullLayout />,
    children: [
      { path: "", element: <Navigate to="/apps" /> },
      { path: "dashboard", exact: true, element: <Dashboard /> },
      { path: "video", exact: true, element: <VideoConverter /> },
      { path: "profile", exact: true, element: <Profile /> },
      { path: "ui/typography", exact: true, element: <TypographyPage /> },
      { path: "ui/shadow", exact: true, element: <Shadow /> },
    ],
  },
  {
    path: "apps",
    element: <FullLayout />,
    children: [
      { path: "", element: <Apps /> },
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
      { path: "color", exact: true, element: <ColorPicker /> },
      { path: "calculator", exact: true, element: <ReactCalculator /> },
      { path: "sheets", exact: true, element: <Spreadsheet /> },
      { path: "rest", exact: true, element: <GetSumRest /> },
      { path: "recipes", exact: true, element: <Recipes /> },
      { path: "recipes/:recipeId", exact: true, element: <Recipe /> },
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
