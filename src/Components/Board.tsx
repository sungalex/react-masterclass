import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
// import { theme } from "../theme";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  min-width: 150px;
  width: 100vw;
  min-height: 300px;
  max-height: calc(100vh - 180px);
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

// const Button = styled.button<IButtonProps>`
//   position: absolute;
//   right: 10px;
//   top: 5px;
//   text-align: center;
//   width: 30px;
//   border-style: none;
//   background-color: ${theme.boardColor};
// `;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
  padding: 0px 5px;
`;

const Input = styled.input`
  border-style: none;
  padding: 10px 15px;
  border-radius: 20px;
  text-align: center;
  ::placeholder {
    color: #b2bec3;
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#9fd1e6"
      : props.isDraggingFromThis
      ? "#e8caab"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px 5px;
`;

// interface IButtonProps {
//   boardId: string;
// }

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardId: string;
  toDos: IToDo[];
}

interface IForm {
  toDo: string;
  boardId: string;
}

function Board({ boardId, toDos }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((allBoards) => {
      const newToDo = { id: Date.now(), text: toDo };
      return { ...allBoards, [boardId]: [newToDo, ...allBoards[boardId]] };
    });
    setValue("toDo", "");
  };
  // const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   console.log(event);
  // };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {/* <Button boardId={boardId} onClick={onDelete}>
        ☆
      </Button> */}
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
