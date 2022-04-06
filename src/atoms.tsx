import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const trashState = atom<IToDoState>({
  key: "trash",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
