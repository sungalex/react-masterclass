import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "theme",
  default: true,
});
