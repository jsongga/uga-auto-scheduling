import { Avatar, Box, Button, Stack, styled, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const goToLand = () => navigate("/");
  const goToSignup = () => navigate("/signup");
  const goToLogin = () => navigate("/login");
  const goToSchedule = () => navigate("/scheduler");

  return (
    <NavContainer>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"}>
          <StyledAppName level={"h3"} onClick={goToLand}>
            Scheduler
          </StyledAppName>
        </Stack>
        <Stack direction={"row"} gap={3}>
          {/*  <NavButtons variant={"plain"} onClick={goToSchedule}>*/}
          {/*    Schedule*/}
          {/*  </NavButtons>*/}
          {/*  <NavButtons variant={"plain"} onClick={goToLogin}>*/}
          {/*    Login*/}
          {/*  </NavButtons>*/}
          <Avatar alt={"User"} src={""} />
        </Stack>
      </Stack>
    </NavContainer>
  );
}

const NavContainer = styled(Box)`
  padding: 1rem;
  background-color: #f5f5f5;
`;

const NavButtons = styled(Button)`
  color: #8d91ff;
`;

const StyledAppName = styled(Typography)`
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #8d91ff;
    transform: scale(1.02);
  }
`;
