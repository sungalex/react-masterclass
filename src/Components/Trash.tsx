import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { trashState } from "../atoms";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 20px;
  width: 200px;
  height: 100px;
`;

const Icon = styled.span`
  position: fixed;
  color: white;
  font-size: 400%;
  padding: 5px;
`;

function Trash() {
  const trashBoards = useRecoilValue(trashState);
  console.log("Trash Boards:", trashBoards);
  return (
    <Wrapper>
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
