import { useState, useContext } from "react";
import "./AddItemForm.css";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";
import { useToast } from "../../providers/ToastProvider";
import { useToDosReducerContext } from "../../providers/ToDosReducerProvider";
import { enToDoReducerActionType } from "../../consts/ToDoReducerType";

export default function AddItemForm() {
  //States
  const [taskTitle, setTaskTitle] = useState("");
  let { toDos, dispatchToDosReducer } = useToDosReducerContext();

  //contexts
  let snackBarDisplayHandlerContext = useToast();

  //functions
  function addNewToDoItem(toDoTitle) {
    dispatchToDosReducer({
      type: enToDoReducerActionType.add,
      payload: { newTitle: toDoTitle },
    });
    snackBarDisplayHandlerContext("تم إضافة مهمة بنجاح");
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
