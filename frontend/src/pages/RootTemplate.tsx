import Navbar from "../components/Navbar.tsx";
import { Sheet, Stack, styled } from "@mui/joy";
import { Outlet } from "react-router-dom";

export default function RootTemplate() {
  return (
    <>
      <StyledSheet>
        {/*<Stack sx={{ height: "100%" }}>*/}
        <Navbar />
        <Outlet />
        {/*</Stack>*/}
      </StyledSheet>
    </>
  );
}

const StyledSheet = styled(Sheet)`
  height: 100vh;
  background-color: #ecebe9;
  overflow: visible;
`;
