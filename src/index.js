import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import store from "./redux-toolkit/store.js";
import Login from "./auth/login";
import Register from "./auth/register";
import App from "./App";
import "./input.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
ReactDOM.render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
