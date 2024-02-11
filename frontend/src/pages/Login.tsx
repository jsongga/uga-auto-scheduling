import { Button, Container, Input, Stack, styled } from "@mui/joy";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

const MainContent = styled(Stack)`
  width: 100%;
  height: 100%;
`;
