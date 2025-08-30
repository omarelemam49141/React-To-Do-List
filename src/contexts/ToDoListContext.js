import { createContext } from "react";

export const ToDoListContext = createContext({
  toDosState: null,
  setToDosState: null,
});
