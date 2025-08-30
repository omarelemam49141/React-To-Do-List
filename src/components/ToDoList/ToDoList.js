import { useEffect, useState } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ListItem from "../ListItem/ListItem";
import MyMenu from "../Menu/MyMenu";
import { v4 as uuidv4 } from "uuid";
import { ToDoListContext } from "../../contexts/ToDoListContext";
import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";
import { enToDoFilter } from "../../contexts/ToDoFilter";
import "./ToDoList.css";

let toDosInitial = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "الإنجاز فى نهاية الشهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتابين",
    description: "الإنجاز فى شهر ونصف",
    isCompleted: false,
  },
];

export default function ToDoList() {
  //States
  let [toDos, setToDos] = useState(toDosInitial);
  let [filterToDosBy, setFilterToDosBy] = useState(enToDoFilter.All);

  //hooks
  useEffect(() => {
    let toDosInLocalStorage = localStorage.getItem(enLocalStorageKeys.toDos);
    let parsedToDos = toDosInLocalStorage
      ? JSON.parse(toDosInLocalStorage)
      : toDosInitial;

    setToDos(parsedToDos);
  }, []);

  //handlers
  function filterToDoItemsHandler(filterBy) {
    setFilterToDosBy(filterBy);
  }

  //Properties
  let filteredToDos = toDos;
  if (filterToDosBy === enToDoFilter.Completed) {
    filteredToDos = filteredToDos.filter((item) => item.isCompleted);
  } else if (filterToDosBy === enToDoFilter.NotCompleted) {
    filteredToDos = filteredToDos.filter((item) => !item.isCompleted);
  }

  let toDosList = filteredToDos.map((item) => {
    return (
      <div className="mb-4">
        <ListItem key={item.id} toDoItem={item} />
      </div>
    );
  });

  return (
    <>
      <header className="App-header">
        <h1>مهامى</h1>
      </header>

      <div className="mb-4">
        <MyMenu
          filterBy={filterToDosBy}
          filterToDoItems={filterToDoItemsHandler}
        />
      </div>

      <ToDoListContext.Provider
        value={{ toDosState: toDos, setToDosState: setToDos }}
      >
        <div className="list-items">{toDosList}</div>
      </ToDoListContext.Provider>

      <div className="mb-4 mt-4">
        <AddItemForm setToDosState={{ toDos, setToDos }} />
      </div>
    </>
  );
}
