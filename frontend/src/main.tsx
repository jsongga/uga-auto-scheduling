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
import Logout from "./pages/Logout.tsx";
import Profile from "./pages/Profile.tsx";
import ScheduleCreator from "./pages/ScheduleCreator.tsx";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true;
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    secondary: PaletteRange;
    analog1: PaletteRange;
    analog2: PaletteRange;
    triadic1: PaletteRange;
    triadic2: PaletteRange;
  }
}

const domain = "dev-hngcj4gnq03d0dw2.us.auth0.com";
const clientId = "zY5pzNXnlxSpC2YaDByP9pGzClDW5x8A";

import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
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
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/",
    element: <RootTemplate />,
    children: [
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

const myTheme = extendTheme({
  fontFamily: {
    display: "Arvo", // applies to `h1`–`h4`
    body: "Arvo", // applies to `title-*` and `body-*`
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#ebeff5",
          "100": "#ced7e0",
          "200": "#b0bdc9",
          "300": "#92a2b3",
          "400": "#7b8da1",
          "500": "#647a90",
          "600": "#576b7f",
          "700": "#475868",
          "800": "#384553",
          "900": "#26303b",
        },
        secondary: {
          "50": "#f0ede8",
          "100": "#d9d0c8",
          "200": "#bfb1a5",
          "300": "#a49281",
          "400": "#907a64",
          "500": "#7c6348",
          "600": "#705942",
          "700": "#614c38",
          "800": "#533f2f",
          "900": "#443124",
        },
        analog1: {
          "50": "#e4f6f5",
          "100": "#bfe9e7",
          "200": "#9bdbd9",
          "300": "#81cbcb",
          "400": "#76c0c1",
          "500": "#74b5b8",
          "600": "#6da5a7",
          "700": "#649090",
          "800": "#5d7c7b",
          "900": "#4f5756",
        },
        analog2: {
          "50": "#e8e9ef",
          "100": "#c5c7d8",
          "200": "#a0a2bd",
          "300": "#7d7fa3",
          "400": "#646490",
          "500": "#4d4a7f",
          "600": "#464377",
          "700": "#3e3a6b",
          "800": "#36315f",
          "900": "#28204c",
        },
        triadic1: {
          "50": "#ebe8ef",
          "100": "#cec7d8",
          "200": "#afa3be",
          "300": "#907ea4",
          "400": "#7a6490",
          "500": "#654c7e",
          "600": "#5f4679",
          "700": "#553e6f",
          "800": "#4c3865",
          "900": "#3e2c58",
        },
        triadic2: {
          "50": "#fce6ec",
          "100": "#e0c6d1",
          "200": "#c2a3b2",
          "300": "#a57f91",
          "400": "#90647a",
          "500": "#7b4a63",
          "600": "#6f415a",
          "700": "#5e364d",
          "800": "#4d2c42",
          "900": "#3c2035",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "https://172.20.147.40:5173/scheduler",
      }}
    >
      <CssVarsProvider theme={myTheme}>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
