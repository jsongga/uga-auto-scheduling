import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Autocomplete,
  createFilterOptions,
  IconButton,
  Stack,
  StackProps,
  styled,
  Theme,
  Tooltip,
} from "@mui/joy";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useEffect, useState } from "react";
import { Schedule } from "../../pages/ScheduleCreator.tsx";

const options = ["CSCI 2610", "CSCI 2620", "CSCI 2630", "CSCI 2640"];
const filter = createFilterOptions<string>();
export default function SingleCard(props: {
  // children: React.ReactNode;
  options: string[];
  details: Schedule;
  setSchedule: any;
}) {
  // const [isImportant, setIsImportant] = useState(false);
  //
  // useEffect(() => {
  //   console.log(isImportant);
  // }, [isImportant]);

  return (
    <StyledStack
      direction="row"
      spacing={2}
      pl={1}
      pr={1}
      alignItems={"center"}
      special={props.details.mustTake}
    >
      <DragIcon />
      <StyledAutocomplete
        options={props.options}
        multiple
        variant={"plain"}
        size={"lg"}
        onChange={(event, value) => {
          if (
            (value as string[])[(value as string[]).length - 1]?.startsWith(
              "Finish to add CRN: ",
            )
          ) {
            return;
          }
          props.setSchedule({
            type: "change",
            options: value,
            uid: props.details.uid,
          });
        }}
        value={props.details.options}
        filterOptions={(options, params) => {
          const filtered = filter(options as string[], params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = (options as string[]).some(
            (option: string) => inputValue === option,
          );
          const isNumber = !isNaN(Number(inputValue));
          const length = inputValue.length;

          if (inputValue !== "" && !isExisting) {
            if (isNumber && length <= 4)
              filtered.push(`Finish to add CRN: ${inputValue}`);
            else if (isNumber && length === 5) {
              filtered.push(`CRN: ${inputValue}`);
            }
          }

          return filtered;
        }}
        // startDecorator={<DragIndicatorIcon />}
      />
      <Tooltip title={"Whether the course is a must-take"} enterDelay={500}>
        <StyledIconButton
          aria-pressed={props.details.mustTake ? "true" : "false"}
          sx={(theme) => ({
            [`&[aria-pressed="true"]`]: {
              ...theme.variants.outlinedActive.neutral,
              borderColor: theme.vars.palette.neutral.outlinedHoverBorder,
              color: "#f55353",
            },
          })}
          onClick={() => {
            props.setSchedule({
              uid: props.details.uid,
              type: "toggle",
            });
          }}
        >
          <GppMaybeIcon />
        </StyledIconButton>
      </Tooltip>
      {/*{props.children}*/}
    </StyledStack>
  );
}

const StyledIconButton = styled(IconButton)`
  background: transparent;
  border: transparent;
  &:hover {
    background: transparent;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const DragIcon = styled(DragIndicatorIcon)`
  opacity: 0.5;
  transition: all 0.3s ease;
  pointer-events: none;

  &:hover {
    opacity: 0.7;
  }
`;

interface StyledStackProps extends StackProps {
  special: boolean;
}

const StyledStack = styled(Stack, {
  // shouldForwardProp: (prop) => prop !== "special",
})(({ special, theme }: StyledStackProps & { theme: Theme }) => ({
  // borderRadius: 20,
  boxShadow: `2px 2px 5px 0px rgba(0, 0, 0, 0.2)`,
  cursor: "pointer",
  overflow: "hidden",
  background: special
    ? theme.palette.analog2["100"]
    : theme.palette.analog2["50"],
  "&:active": {
    cursor: "grabbing",
  },
}));
//   box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
//   //margin: 0.5rem 1rem;
//   cursor: pointer;
//   overflow: hidden;
//   background: ${({ special, theme }) => (special ? theme.palette.analog2["100"] : theme.palette.analog2["50"])};
//
//   &:active {
//     cursor: grabbing;
//   }
// `,
// );

const StyledCard = styled(Paper)`
  background: transparent;
  border: transparent;
  border-radius: 20px;
  //margin: 0.5rem 1rem;
`;
