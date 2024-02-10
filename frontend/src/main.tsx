import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Landing from "./pages/Landing.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import RootTemplate from "./pages/RootTemplate.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import ScheduleCreator from "./pages/ScheduleCreator.tsx";

const domain = "dev-hngcj4gnq03d0dw2.us.auth0.com";
const clientId = "zY5pzNXnlxSpC2YaDByP9pGzClDW5x8A";

import { Auth0Provider } from '@auth0/auth0-react';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootTemplate />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/scheduler",
        element: <ScheduleCreator />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    {/*<Landing />*/}
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
);
