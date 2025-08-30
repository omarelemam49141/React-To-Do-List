import { useState } from "react";
import "./AddItemForm.css";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";

export default function AddItemForm({ setToDosState }) {
  //States
  const [taskTitle, setTaskTitle] = useState("");

  //functions
  function addNewToDoItem(toDoTitle) {
    let newToDosList = [
      ...setToDosState.toDos,
      { id: uuidv4(), title: toDoTitle, description: "", isCompleted: false },
    ];
    setToDosState.setToDos(newToDosList);
    localStorage.setItem(
      enLocalStorageKeys.toDos,
      JSON.stringify(newToDosList)
    );
  }

  return (
    <>
      <form
        className="addTaskForm"
        onSubmit={(e) => {
          e.preventDefault();
          addNewToDoItem(taskTitle);
          setTaskTitle("");
        }}
      >
        <input
          type="text"
          placeholder="عنوان المهة"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          className="submit-btn"
          disabled={taskTitle?.trim()?.length < 2}
        >
          إضافة
        </Button>
      </form>
    </>
  );
}
