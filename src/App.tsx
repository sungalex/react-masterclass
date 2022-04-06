import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, trashState } from "./atoms";
import Board from "./Components/Board";
import Trash from "./Components/Trash";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setTrash = useSetRecoilState(trashState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === "Trash") {
      // delete toDo
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
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const draggableObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination?.index, 0, draggableObj);
        return { ...allBoards, [source.droppableId]: sourceBoard };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
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
  console.log("toDos:", toDos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
        <Trash />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
