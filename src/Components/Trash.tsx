import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { toDoState, trashState } from "../atoms";

const Wrapper = styled.div<{ length: number }>`
  position: absolute;
  right: calc(100vw / (${(props) => props.length} * 2) - 10px);
  top: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`;

const Icon = styled.span`
  position: fixed;
  color: white;
  font-size: 150%;
  padding: 5px;
`;

function Trash() {
  const trashBoards = useRecoilValue(trashState);
  const toDos = useRecoilValue(toDoState);
  let length = Object.keys(toDos).length;
  if (length < 3) {
    length = 3;
  }
  console.log("Trash Boards:", trashBoards);
  return (
    <Wrapper length={length}>
      <Icon>
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </Icon>
      <Droppable droppableId="Trash" isCombineEnabled={true}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trash;
