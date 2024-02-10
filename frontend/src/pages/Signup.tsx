import { Button, Container, Input, Stack, styled } from "@mui/joy";

export default function Signup() {
  return (
    <Container maxWidth={"md"} sx={{ flex: 1 }}>
      <MainContent justifyContent={"center"}>
        <Button size={"lg"}>Register with Google</Button>
        or
        <Input placeholder={"Username"} size={"lg"} />
        <Input placeholder={"Password"} size={"lg"} />
      </MainContent>
    </Container>
  );
}

const MainContent = styled(Stack)`
  width: 100%;
  height: 100%;
`;
