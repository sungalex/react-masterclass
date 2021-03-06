import React from "react";
import { useSetRecoilState } from "recoil";
import { Catetories, IToDo, toDoState } from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      if (name === Catetories.DELETE) {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      } else {
        const newToDo = { text, id, category: name as Catetories };
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Catetories.TO_DO && (
        <button name={Catetories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Catetories.DOING && (
        <button name={Catetories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Catetories.DONE && (
        <button name={Catetories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name={Catetories.DELETE} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
