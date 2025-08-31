import { createContext, useContext, useReducer } from "react";
import { ToDosReducer } from "../reducers/ToDosReducer";

const ToDosReducerContext = createContext(null);

export const ToDosReducerProvider = ({ children }) => {
  const [toDos, dispatchToDosReducer] = useReducer(ToDosReducer, []);

  return (
    <ToDosReducerContext.Provider value={{ toDos, dispatchToDosReducer }}>
      {children}
    </ToDosReducerContext.Provider>
  );
};

export const useToDosReducerContext = () => useContext(ToDosReducerContext);
