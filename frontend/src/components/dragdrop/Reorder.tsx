import update from "immutability-helper";
import React, { FC, useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper.tsx";
import { Box, styled } from "@mui/joy";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// const style: React.CSSProperties = {
//   width: 400,
// };

export interface Item {
  id: number;
  text: string[];
}

// export interface ContainerState {
//   cards: Item[];
// }

export const Reorder = (props: { list: string[] }) => {
  // useEffect(() => {
  //   setCards(props.list.map((text, id) => ({ id, text })) as Item[]);
  // }, [props.list]);

  const [cards, setCards] = useState<Item[]>([
    { id: 1, text: [] },
    { id: 2, text: [] },
    { id: 3, text: [] },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (card: Item, index: number) => {
      return (
        <CardWrapper
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          options={props.list}
        />
      );
    },
    [moveCard, props.list],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledWrapper>
        {cards.map((card, i) => renderCard(card, i))}
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
