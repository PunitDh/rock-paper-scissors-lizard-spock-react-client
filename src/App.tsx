import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import { baselightTheme } from "./theme/DefaultColors";
import { SocketProvider } from "./context/SocketContext";
import { NotificationProvider } from "./context/NotificationContext";
import SocketListeners from "./listeners/SocketListeners";
import { TokenProvider } from "./context/TokenContext";

function App(): React.ReactNode {
  const routing = useRoutes(Router);

  return (
    <ThemeProvider theme={baselightTheme}>
      <NotificationProvider>
        <SocketProvider>
          <TokenProvider>
            <SocketListeners />
            <CssBaseline />
            {routing}
          </TokenProvider>
        </SocketProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
