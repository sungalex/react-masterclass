import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDo} key={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
