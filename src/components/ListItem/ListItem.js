import "./ListItem.css";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import {
  ToDoListContext,
} from "../../contexts/ToDoListContext";

import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";
import { useToast } from "../../providers/ToastProvider";

export default function ListItem({
  toDoItem,
  setOpenDeleteDialogState,
  setOpenEditDialogState,
}) {
  //context
  let toDosStateObj = useContext(ToDoListContext);
  let snackBarDisplayHandlerContext = useToast();

  //functions
  function setIsCompletedHandler(isCompleted) {
    let newToDosList = toDosStateObj.toDosState.map((item) => {
      if (item.id === toDoItem.id) {
        item.isCompleted = isCompleted;
      }
      return item;
    });
    toDosStateObj.setToDosState(newToDosList);
    localStorage.setItem(
      enLocalStorageKeys.toDos,
      JSON.stringify(newToDosList)
    );
    snackBarDisplayHandlerContext("تم تعديل المهمة بنجاح");
  }

  //methods
  function getCheckedIcon() {
    if (!toDoItem.isCompleted) {
      return (
        <span
          onClick={() => setIsCompletedHandler(true)}
          style={{ borderColor: "var(--mui-palette-primary-main)" }}
        >
          <span className="icon" color="primary" />
        </span>
      );
    }

    return (
      <span
        onClick={() => setIsCompletedHandler(false)}
        style={{ borderColor: "var(--mui-palette-primary-main)" }}
      >
        <CheckIcon className="icon" color="primary" />
      </span>
    );
  }

  //jsx
  return (
    <>
      <div className="list-item">
        <div className="info">
          <h3
            style={{
              textDecoration: toDoItem.isCompleted ? "line-through" : "none",
            }}
          >
            {toDoItem.title}
          </h3>
          <p>{toDoItem.description}</p>
        </div>

        <div className="actions">
          {getCheckedIcon()}
          <span
            style={{ borderColor: "var(--mui-palette-secondary-main)" }}
            onClick={() =>
              setOpenEditDialogState({ item: toDoItem, display: true })
            }
          >
            <CreateIcon
              className="icon"
              style={{ color: "var(--mui-palette-secondary-main)" }}
            />
          </span>
          <span
            style={{ borderColor: "red" }}
            onClick={() =>
              setOpenDeleteDialogState({ itemId: toDoItem.id, display: true })
            }
          >
            <DeleteIcon className="icon" color="danger" />
          </span>
        </div>
      </div>
    </>
  );
}
