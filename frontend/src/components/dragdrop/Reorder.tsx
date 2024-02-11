import update from "immutability-helper";
import React, { FC, useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper.tsx";
import { Box, styled } from "@mui/joy";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Schedule } from "../../pages/ScheduleCreator.tsx";

// const style: React.CSSProperties = {
//   width: 400,
// };

// export interface Item {
//   // id: number;
//   options: string[];
//   mustTake: boolean;
// }

// export interface ContainerState {
//   cards: Item[];
// }

export const Reorder = (props: {
  list: string[];
  listShort: string[];
  schedule: Schedule[];
  setSchedule: any;
}) => {
  // useEffect(() => {
  //   setCards(props.list.map((text, id) => ({ id, text })) as Item[]);
  // }, [props.list]);

  // const [cards, setCards] = useState<Item[]>([
  //   { id: 1, text: [] },
  //   { id: 2, text: [] },
  //   { id: 3, text: [] },
  // ]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // setCards((prevCards: Item[]) =>
      //   update(prevCards, {
      //     $splice: [
      //       [dragIndex, 1],
      //       [hoverIndex, 0, prevCards[dragIndex] as Item],
      //     ],
      //   }),
      // );
      props.setSchedule({ type: "move", from: dragIndex, to: hoverIndex });
      // console.log(dragIndex, hoverIndex);
    },
    [props],
  );

  const renderCard = useCallback(
    (card: Schedule, index: number) => {
      return (
        <CardWrapper
          key={card.uid}
          index={index}
          id={card.uid}
          // text={card.text}
          moveCard={moveCard}
          optionsShort={props.listShort}
          options={props.list}
          details={card}
          setSchedule={props.setSchedule}
        />
      );
    },
    [moveCard, props.list],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledWrapper>
        {props.schedule
          // .sort((a: Schedule, b: Schedule) => a.priority - b.priority)
          .map((card: Schedule, index) => renderCard(card, index))}
      </StyledWrapper>
    </DndProvider>
  );
};

const StyledWrapper = styled(Box)`
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`;
