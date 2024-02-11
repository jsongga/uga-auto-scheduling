import { useEffect, useReducer, useState } from "react";
import { Reorder } from "../components/dragdrop/Reorder.tsx";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import Paper from "@mui/material/Paper";
import { convertToTTime, generateUID } from "../utils.ts";
import Build from "./Build.tsx";

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
    case "all":
      return action.schedule;
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

export type Professor = {
  firstName: string;
  lastName: string;
  rating: number;
};

export type Class = {
  courseName: string;
  courseNumber: string;
  crn: number;
  endTime: number[];
  group: number;
  location: string[];
  professor: Professor;
  rooms: string[];
  seats: number;
  startTime: number[];
};

export type Option = {
  avgProfessorRating: number;
  classes: Class[];
  numClasses: number;
  totalDaysOnCampus: number;
  totalDistance: number;
  totalTimeOnCampus: number;
};

export default function ScheduleCreator() {
  const [classes, setClasses] = useState(["Loading courses..."]);
  const [classesShort, setClassesShort] = useState(["Loading courses..."]);
  const [schedule, setSchedule] = useReducer(scheduleReducer, [
    { options: [], mustTake: false, priority: 0, uid: generateUID() },
    { options: [], mustTake: false, priority: 1, uid: generateUID() },
    { options: [], mustTake: false, priority: 2, uid: generateUID() },
  ]);
  const [scheduleOptions, setScheduleOptions] = useState<Option[]>([]);
  const [optionID, setOptionID] = useState(0);
  const [gotOptions, setGotOptions] = useState(false);

  useEffect(() => {
    // Load the state from localStorage when the component mounts
    const savedSchedule = localStorage.getItem("schedule");
    if (savedSchedule) {
      setSchedule({ type: "all", schedule: JSON.parse(savedSchedule) });
    }
    setGotOptions(true);
  }, []);

  useEffect(() => {
    if (!gotOptions) return;
    // Save the state to localStorage whenever it changes
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule, gotOptions]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/courses")
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
    console.log(`Submitting schedule: ${JSON.stringify(schedule)}`);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schedule),
    };
    console.log(requestOptions.body);
    fetch("http://localhost:8080/scheduling", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setScheduleOptions(data);
      });
  };

  return scheduleOptions.length > 0 ? (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid xs={12} md={3}>
          <Stack gap={1} alignItems={"center"}>
            <Typography level={"h3"}>All Schedules</Typography>
            <Stack direction={"row"} gap={2}>
              <Button
                variant={"plain"}
                onClick={() => {
                  console.log("Sorting by rating");
                  setScheduleOptions(
                    [...scheduleOptions].sort(
                      (a: Option, b: Option) =>
                        b.avgProfessorRating - a.avgProfessorRating,
                    ),
                  );
                }}
              >
                Sort by Rating
              </Button>
              <Button
                variant={"plain"}
                onClick={() => {
                  setScheduleOptions(
                    [...scheduleOptions].sort(
                      (a: Option, b: Option) =>
                        a.totalDaysOnCampus - b.totalDaysOnCampus,
                    ),
                  );
                }}
              >
                Sort by Campus Days
              </Button>
              <Button
                variant={"plain"}
                onClick={() => {
                  setScheduleOptions(
                    [...scheduleOptions].sort(
                      (a: Option, b: Option) =>
                        a.totalTimeOnCampus - b.totalTimeOnCampus,
                    ),
                  );
                }}
              >
                Sort by Time on Campus
              </Button>
            </Stack>
            <Stack height={"50vh"} sx={{ overflow: "scroll" }}>
              {scheduleOptions.map((option: Option, index: number) => (
                <StyledOption
                  onClick={() => {
                    setOptionID(index);
                  }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Chip>
                      Rating: {option.avgProfessorRating.toPrecision(2)}
                    </Chip>
                    <Chip>Days on Campus: {option.totalDaysOnCampus}</Chip>
                    <Chip>
                      Time on Campus:{" "}
                      {Math.floor(option.totalTimeOnCampus / 60)}:
                      {option.totalTimeOnCampus % 60}
                    </Chip>
                  </Stack>
                </StyledOption>
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={12} md={9}>
          <Build
            events={scheduleOptions[optionID].classes.flatMap(
              (course: Class) => {
                const starts = convertToTTime(course.startTime);
                const ends = convertToTTime(course.endTime);

                let schedules = [];

                for (let i = 0; i < course.location.length; i++) {
                  if (course.location[i] === "") continue;
                  schedules.push({
                    title: `${course.courseName} (${course.courseNumber})`,
                    start: starts[i],
                    end: ends[i],
                    extendedProps: {
                      description:
                        course.professor.firstName +
                        " " +
                        course.professor.lastName,
                      description2: course.location[i],
                      description3: course.rooms[i],
                      // description4: course.description,
                    },
                  });
                }

                return schedules;

                // return [
                //   {
                //     title: `${course.courseName} ${course.courseNumber}`,
                //     start: `2024-02-06T${course.startTime[0]}:${course.startTime[1]}:00`,
                //     end: `2024-02-06T${course.endTime[0]}:${course.endTime[1]}:00`,
                //     extendedProps: {
                //       description:
                //         course.professor.firstName + " " + course.professor.lastName,
                //     },
                //   },
                // ];
              },
            )}
          />
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button onClick={() => setScheduleOptions([])}>Go Back</Button>
            <Button
              onClick={() => {
                setOptionID((optionID + 1) % scheduleOptions.length);
              }}
            >
              View Next
            </Button>
            <Button
              onClick={() => {
                setOptionID(
                  (optionID - 1 + scheduleOptions.length) %
                    scheduleOptions.length,
                );
              }}
            >
              View Previous
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  ) : (
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

const StyledOption = styled(Card)`
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;
