import update from "immutability-helper";
import React, { FC, useCallback, useState } from "react";
import { CardWrapper } from "./CardWrapper.tsx";
import { Box, styled } from "@mui/joy";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// const style: React.CSSProperties = {
//   width: 400,
// };

export interface Item {
  id: number;
  text: string;
}

// export interface ContainerState {
//   cards: Item[];
// }

export const Reorder: FC = () => {
  const [cards, setCards] = useState<Item[]>([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
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
        />
      );
    },
    [moveCard],
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
