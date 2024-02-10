import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Autocomplete,
  IconButton,
  Stack,
  StackProps,
  styled,
  Theme,
  Tooltip,
} from "@mui/joy";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useEffect, useState } from "react";

const options = ["CSCI 2610", "CSCI 2620", "CSCI 2630", "CSCI 2640"];

export default function SingleCard(props: {
  children: React.ReactNode;
  options: string[];
}) {
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    console.log(isImportant);
  }, [isImportant]);

  return (
    <StyledStack
      direction="row"
      spacing={2}
      pl={1}
      pr={1}
      alignItems={"center"}
      special={isImportant}
    >
      <DragIcon />
      <StyledAutocomplete
        options={props.options}
        multiple
        variant={"plain"}
        size={"lg"}
        // startDecorator={<DragIndicatorIcon />}
      />
      <Tooltip title={"Whether the course is a must-take"}>
        <StyledIconButton
          aria-pressed={isImportant ? "true" : "false"}
          sx={(theme) => ({
            [`&[aria-pressed="true"]`]: {
              ...theme.variants.outlinedActive.neutral,
              borderColor: theme.vars.palette.neutral.outlinedHoverBorder,
              color: "#f55353",
            },
          })}
          onClick={() => {
            setIsImportant(!isImportant);
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
