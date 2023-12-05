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
import Reset from './auth/reset'
import Admin from './admin'
import Developing from './Error/developing'
import App from "./App";
import NotFound from './Error/notfound/index.jsx'
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
  {
    path: "/reset-password",
    element: <Reset />,
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/dev",
    element: <Developing />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
ReactDOM.render(
  <Provider store={store}>
     <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
