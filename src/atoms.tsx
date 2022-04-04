import { atom } from "recoil";

export const toDoState = atom({
  key: "toDo",
  default: [],
});
