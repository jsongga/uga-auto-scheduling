import {
  AspectRatio,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Sheet,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Landing() {
  const myRef = useRef(null);
  // @ts-ignore
  const executeScroll = () => myRef.current.scrollIntoView();
  const navigate = useNavigate();

  const goToSignup = () => navigate("/signup");
  const goToLogin = () => navigate("/login");

  return (
    <Box>
      <StyledSheet1>
        <Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <AppName level={"h1"}>Scheduler</AppName>
            <Button variant={"plain"} onClick={goToLogin} sx={{ margin: 3 }}>
              Login
            </Button>
          </Stack>
          <Grid container>
            <Grid md={7} xs={12}>
              <Container maxWidth={"sm"} sx={{ mt: 10 }}>
                <Stack gap={"2.5rem"}>
                  <TitleContainer>
                    <MainTitle level={"h1"}>Hey students,</MainTitle>
                    <MainTitle level={"h1"}>meet your new scheduler</MainTitle>
                  </TitleContainer>
                  <Content level={"body-lg"}>
                    We designed scheduler to automatically plan out your
                    semester, with the best professors, at the optimal distance
                  </Content>
                  <Stack direction={"row"} gap={3}>
                    <MainButton
                      variant={"solid"}
                      size={"lg"}
                      onClick={goToSignup}
                    >
                      Sign-up
                    </MainButton>
                    <MainButton
                      variant={"outlined"}
                      size={"lg"}
                      onClick={executeScroll}
                    >
                      Learn More
                    </MainButton>
                  </Stack>
                </Stack>
              </Container>
            </Grid>
            <Grid md={5} xs={12}>
              <Box sx={{ margin: "0 30px 30px" }}>
                <MainImage
                  src={
                    "https://images.unsplash.com/photo-1529651737248-dad5e287768e?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={"schedule"}
                />
              </Box>
            </Grid>
          </Grid>
          {/*<MainContent justifyContent={"center"} alignItems={"center"}>*/}
          {/*  <h1>Welcome to ______!</h1>*/}
          {/*  <h2>Sign-up to build your schedule</h2>*/}
          {/*  <Button variant={"outlined"} onClick={goToSignup}>*/}
          {/*    Sign-up*/}
          {/*  </Button>*/}
          {/*</MainContent>*/}
        </Stack>
      </StyledSheet1>
      <StyledSheet2 ref={myRef}>
        <Grid container>
          <Grid md={6} xs={12}>
            <Card>Rate My Professor</Card>
          </Grid>
          <Grid md={6} xs={12}>
            <Card>Google Distance API</Card>
          </Grid>
          <Grid md={6} xs={12}>
            <Card>Course Catalog</Card>
          </Grid>
          <Grid md={6} xs={12}>
            <Card>Automated Scheduling</Card>
          </Grid>
        </Grid>
      </StyledSheet2>
    </Box>
  );
}

const StyledSheet1 = styled(Box)`
  background-color: #ecebe9;
  overflow: visible;
`;

const StyledSheet2 = styled(StyledSheet1)`
  background-color: ${({ theme }) => theme.palette.secondary["100"]};
`;

const MainImage = styled("img")`
  width: 100%;
  border-radius: 18px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-15px);
  }
`;

const TitleContainer = styled(Stack)`
  cursor: pointer;
  &:hover {
    & h1 {
      letter-spacing: 0.1px;
    }
  }
  gap: 1rem;
`;

const Content = styled(Typography)`
  line-height: 2em;
`;

const MainTitle = styled(Typography)`
  font-family: "Arvo", serif;
  transition: 0.3s ease;
  //&:hover {
  //  letter-spacing: 1px;
  //}
  //font-size: 3rem;
  //font-weight: 700;
`;

const MainButton = styled(Button)`
  border-radius: 0;
`;

const AppName = styled(Typography)`
  font-family: "Architects Daughter", cursive;
  cursor: pointer;
  transition: 0.3s ease;
  margin: 1rem;
  display: inline-block;

  &:hover {
    //color: #8d91ff;
    color: ${({ theme }) => theme.palette.primary["500"]};
    transform: scale(1.02);
  }
`;

const MainContent = styled(Stack)`
  flex: 1;
`;
