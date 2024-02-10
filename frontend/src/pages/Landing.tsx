import { Button, Stack, styled } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const goToSignup = () => navigate("/signup");

  return (
    <MainContent justifyContent={"center"} alignItems={"center"}>
      <h1>Welcome to ______!</h1>
      <h2>Sign-up to build your schedule</h2>
      <Button variant={"outlined"} onClick={goToSignup}>
        Sign-up
      </Button>
    </MainContent>
  );
}

const MainContent = styled(Stack)`
  flex: 1;
`;
