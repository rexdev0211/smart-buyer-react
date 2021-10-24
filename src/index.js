import React from "react";
import ReactDOM from "react-dom";
import * as GA from "./tracker";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ViewportProvider from "./contexts/ViewportProvider";
import { UserService } from "./services/UserService";

if (process.env.ENV === "testing") {
  // TODO
} else {
  GA.initialize();
}

if (process.env.NODE_ENV !== "development")
    console.log = () => {};

const renderApp = () => ReactDOM.render(
  <ViewportProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ViewportProvider>,
  document.getElementById("root")
);

// renderApp();
UserService.initKeycloak(renderApp);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
