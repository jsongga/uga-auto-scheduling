import { Stack, styled } from "@mui/joy";

export default function NotFound() {
  return (
    <MainContent justifyContent={"center"} alignItems={"center"}>
      <h1>404 Not Found</h1>
    </MainContent>
  );
}

const MainContent = styled(Stack)`
  flex: 1;
`;
