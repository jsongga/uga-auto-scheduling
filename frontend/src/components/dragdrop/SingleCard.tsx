import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Autocomplete, Stack, styled } from "@mui/joy";

const options = ["CSCI 2610", "CSCI 2620", "CSCI 2630", "CSCI 2640"];

export default function SingleCard(props: { children: React.ReactNode }) {
  return (
    <StyledStack direction="row" spacing={2} alignItems={"center"}>
      <DragIcon />
      <StyledAutocomplete
        options={options}
        multiple
        variant={"plain"}
        size={"lg"}
        // startDecorator={<DragIndicatorIcon />}
      />
      {/*{props.children}*/}
    </StyledStack>
  );
}

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
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

const StyledStack = styled(Stack)`
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  //margin: 0.5rem 1rem;
  cursor: pointer;
  overflow: hidden;

  &:active {
    cursor: grabbing;
  }
`;

const StyledCard = styled(Paper)`
  background: transparent;
  border: transparent;
  border-radius: 20px;
  //margin: 0.5rem 1rem;
`;
