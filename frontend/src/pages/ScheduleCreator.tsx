import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { Draggable } from "react-drag-reorder";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Reorder } from "../components/dragdrop/Reorder.tsx";
import { Button, Container, Stack, Typography } from "@mui/joy";

export default function ScheduleCreator() {
  const [classes, setClasses] = useState(["Loading courses..."]);

  useEffect(() => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  return (
    <Container maxWidth={"md"}>
      <Stack alignItems={"center"}>
        <Typography level={"h3"}>Schedule Creator</Typography>
        <Reorder list={classes} />
        <Stack direction={"row"} gap={2} justifyContent={"space-between"} width={"100%"}>
          <Stack direction={"row"} gap={2}>
            <Button variant={"outlined"}>Add New Row</Button>
            <Button variant={"outlined"}>Delete Bottom Row</Button>
          </Stack>
          <Button>Generate me a schedule!</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
