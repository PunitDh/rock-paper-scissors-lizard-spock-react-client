import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import { baselightTheme } from "./theme/DefaultColors";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(process.env.REACT_APP_SERVER_URL, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(s);
    return () => s.disconnect();
  }, []);

  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <CssBaseline />
        {routing}
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
