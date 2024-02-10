import { useState } from "react";
import { DndProvider } from "react-dnd";
import { Draggable } from "react-drag-reorder";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Reorder } from "../components/dragdrop/Reorder.tsx";
import { Button, Container, Stack, Typography } from "@mui/joy";

export default function ScheduleCreator() {
  const [words] = useState(["Hello", "Hi", "How are you", "Cool"]);

  return (
    <Container maxWidth={"md"}>
      <Stack alignItems={"center"}>
        <Typography level={"h3"}>Schedule Creator</Typography>
        <Reorder />
        <Button>Submit</Button>
      </Stack>
    </Container>
  );
}
