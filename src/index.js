import App from "./components/App.js";
import { Provider } from "react-redux"
import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store"


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById("root")
);