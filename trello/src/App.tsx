import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, trashState } from "./atoms";
import Board from "./Components/Board";
import CreateBoard from "./Components/CreateForm";
import Trash from "./Components/Trash";

const Wrapper = styled.div<{ length: number }>`
  display: flex;
  width: 100vw;
  min-width: calc(${(props) => props.length} * 160px);
  margin: 0 auto;
  justify-content: center;
  height: calc(100vh - 150px);
  position: relative;
  margin-top: 20px;
  padding: 10px;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  color: white;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [trash, setTrash] = useRecoilState(trashState);
  const length = Object.keys(toDos).length;
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    // delete toDo
    if (destination?.droppableId === "Trash") {
      let trashObj = [] as any;
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        trashObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: sourceBoard };
      });
      setTrash((trashBoards) => {
        let sourceTrash = [...trashBoards[source.droppableId]];
        sourceTrash.splice(0, 0, trashObj);
        return { ...trashBoards, [source.droppableId]: sourceTrash };
      });
      return;
    }

    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const draggableObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination?.index, 0, draggableObj);
        return { ...allBoards, [source.droppableId]: sourceBoard };
      });
    }

    // cross board movement
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const draggableObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  // get & set local storage
  useEffect(() => {
    const storageToDos = JSON.parse(
      localStorage.getItem("toDoStorage") as string
    );
    const storageTrashs = JSON.parse(
      localStorage.getItem("trashStorage") as string
    );
    setToDos(storageToDos);
    setTrash(storageTrashs);
  }, [setToDos, setTrash]);
  useEffect(() => {
    localStorage.setItem("toDoStorage", JSON.stringify(toDos));
    localStorage.setItem("trashStorage", JSON.stringify(trash));
    console.log(
      "local storage:",
      JSON.parse(localStorage.getItem("toDoStorage") as string)
    );
  }, [toDos, trash]);

  console.log("toDos:", toDos);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Title>Trello Clone</Title>
      <CreateBoard />
      <Trash />
      <Wrapper length={length}>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
