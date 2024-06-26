/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchQuestionsAction,
  checkAuthAction,
  fetchTestsAction,
} from "./store/api-actions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

store.dispatch(checkAuthAction());
store.dispatch(fetchTestsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
