import { useEffect, useReducer, useState } from "react";
import { Reorder } from "../components/dragdrop/Reorder.tsx";
import { Button, Container, Stack, Typography } from "@mui/joy";
import { generateUID } from "../utils.ts";

function scheduleReducer(state: any, action: any) {
  console.log(state);
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          options: [],
          mustTake: false,
          priority: state.length,
          uid: generateUID(),
        },
      ];
    case "delete":
      return state.slice(0, -1);
    case "change":
      return state.map((item: Schedule) => {
        if (item.uid === action.uid) {
          return {
            ...item,
            options: action.options,
          };
        }
        return item;
      });
    case "toggle":
      return state.map((item: Schedule) => {
        if (item.uid === action.uid) {
          return {
            ...item,
            mustTake: !item.mustTake,
          };
        }
        return item;
      });
    case "move":
      console.log(`Moving from ${action.from} to ${action.to}`);
      return state
        .map((item: Schedule) => {
          if (item.priority >= action.to && item.priority < action.from) {
            return {
              ...item,
              priority: item.priority + 1,
            };
          } else if (item.priority === action.from) {
            return {
              ...item,
              priority: action.to,
            };
          } else if (item.priority === action.to) {
            // If item is the one we're moving to the new position
            return {
              ...item,
              priority: action.from,
            };
          } else {
            return item;
          }
        })
        .sort((a: Schedule, b: Schedule) => a.priority - b.priority); // Sort the array based on priority after shifting
    default:
      console.log(action);
      return state;
  }
}

export type Schedule = {
  options: string[];
  mustTake: boolean;
  priority: number;
  uid: number;
};

export default function ScheduleCreator() {
  const [classes, setClasses] = useState(["Loading courses..."]);
  const [classesShort, setClassesShort] = useState(["Loading courses..."]);
  const [schedule, setSchedule] = useReducer(scheduleReducer, [
    { options: [1], mustTake: false, priority: 0, uid: generateUID() },
    { options: [2], mustTake: false, priority: 1, uid: generateUID() },
    { options: [3], mustTake: false, priority: 2, uid: generateUID() },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((data) => {
        setClasses(
          data.map(
            (course: string) => course.slice(0, 4) + " " + course.slice(4),
          ),
        );
        setClassesShort([
          ...new Set<string>(
            data.map((course: string) => course.slice(0, 4) + "..."),
          ),
        ]);
      });
  }, []);

  const submitSchedule = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedule),
    };
    fetch("http://localhost:8080/scheduling", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Container maxWidth={"md"}>
      <Stack alignItems={"center"}>
        <Typography level={"h3"} mt={8} mb={2}>
          Create your schedule!
        </Typography>
        <Reorder
          list={classes}
          listShort={classesShort}
          schedule={schedule}
          setSchedule={setSchedule}
        />
        <Stack
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack direction={"row"} gap={2}>
            <Button
              variant={"outlined"}
              onClick={() =>
                setSchedule({
                  type: "add",
                })
              }
            >
              Add New Row
            </Button>
            <Button
              variant={"outlined"}
              onClick={() =>
                setSchedule({
                  type: "delete",
                })
              }
            >
              Delete Bottom Row
            </Button>
          </Stack>
          <Button onClick={submitSchedule}>Generate me a schedule!</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
