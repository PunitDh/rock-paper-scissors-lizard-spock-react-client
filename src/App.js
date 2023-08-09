import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import { baselightTheme } from "./theme/DefaultColors";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <SocketProvider>
          <CssBaseline />
          {routing}
        </SocketProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
