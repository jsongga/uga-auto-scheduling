import Navbar from "../components/Navbar.tsx";
import { Sheet, Stack } from "@mui/joy";
import { Outlet } from "react-router-dom";

export default function RootTemplate() {
  return (
    <>
      <Sheet sx={{ height: "100vh" }}>
        <Stack sx={{ height: "100%" }}>
          <Navbar />
          <Outlet />
        </Stack>
      </Sheet>
    </>
  );
}
