import Build from "./pages/Build.tsx";
import Landing from "./pages/Landing.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import RootTemplate from "./pages/RootTemplate.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import ScheduleCreator from "./pages/ScheduleCreator.tsx";
import AllTemplate from "./pages/AllTemplate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllTemplate />,
    children: [
    // {
    //   path: "/build",
    //   element: <Build />,
    // },
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
  ]}
]);

export default function App() {

  return (
    <RouterProvider router={router} />)
}