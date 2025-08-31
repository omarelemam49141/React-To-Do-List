import { enLocalStorageKeys } from "../consts/LocalStorageKeys.enum";
import { enToDoReducerActionType } from "../consts/ToDoReducerType";
import { v4 as uuidv4 } from "uuid";

function deleteFromToDos(prevToDosState, itemToDeleteId) {
  let newToDosList = prevToDosState.filter(
    (item) => item.id !== itemToDeleteId
  );
  localStorage.setItem(enLocalStorageKeys.toDos, JSON.stringify(newToDosList));
  return newToDosList;
}

function editToDoItem(prevToDosState, itemToEditId, newTitle, newDescription) {
  let newToDosList = prevToDosState?.map((item) => {
    if (item.id === itemToEditId) {
      item.title = newTitle;
      item.description = newDescription;
    }

    return item;
  });
  localStorage.setItem(enLocalStorageKeys.toDos, JSON.stringify(newToDosList));
  return newToDosList;
}

function getAllToDosFromLocalStorage() {
  let toDosInLocalStorage = localStorage.getItem(enLocalStorageKeys.toDos);
  let parsedToDos = toDosInLocalStorage ? JSON.parse(toDosInLocalStorage) : [];

  return parsedToDos;
}

function addNewToDoItem(prevToDosState, newTitle) {
  let newToDosList = [
    ...prevToDosState,
    {
      id: uuidv4(),
      title: newTitle,
      description: "",
      isCompleted: false,
    },
  ];
  localStorage.setItem(enLocalStorageKeys.toDos, JSON.stringify(newToDosList));
  return newToDosList;
}

function modifyIsCompletedState(prevToDosState, itemId, isCompleted) {
  let newToDosList = prevToDosState.map((item) => {
    if (item.id === itemId) {
      item.isCompleted = isCompleted;
    }
    return item;
  });
  localStorage.setItem(enLocalStorageKeys.toDos, JSON.stringify(newToDosList));
  return newToDosList;
}

export function ToDosReducer(prevToDosState, action) {
  switch (action.type) {
    case enToDoReducerActionType.delete:
      return deleteFromToDos(prevToDosState, action.payload.id);
    case enToDoReducerActionType.edit:
      return editToDoItem(
        prevToDosState,
        action.payload.id,
        action.payload.newTitle,
        action.payload.newDescription
      );
    case enToDoReducerActionType.add:
      return addNewToDoItem(prevToDosState, action.payload.newTitle);
    case enToDoReducerActionType.getAll:
      return getAllToDosFromLocalStorage();
    case enToDoReducerActionType.modifyState:
      return modifyIsCompletedState(
        prevToDosState,
        action.payload.id,
        action.payload.isCompleted
      );
    default:
      break;
  }
}
