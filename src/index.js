import { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";
import LoadingScreen from "./components/shared/LoadingScreen";

ReactDOM.render(
  <Suspense fallback={<LoadingScreen />}>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </Suspense>,
  document.getElementById("root")
);
