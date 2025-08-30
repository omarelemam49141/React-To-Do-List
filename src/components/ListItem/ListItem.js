import "./ListItem.css";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { ToDoListContext } from "../../contexts/ToDoListContext";
import AlertDialog from "../Dialogs/AlertDialog/AlertDialog";
import EditToDoItemDialog from "../Dialogs/EditToDoItemDialog/EditToDoItemDialog";
import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";

export default function ListItem({ setRunUseEffectState, toDoItem }) {
  //states
  let [openDeleteDialogState, setOpenDeleteDialogState] = useState(false);
  let [openEditDialogState, setOpenEditDialogState] = useState(false);

  //context
  let toDosStateObj = useContext(ToDoListContext);

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
  }

  function deleteItemFromList() {
    let newToDosList = toDosStateObj.toDosState.filter(
      (item) => item.id !== toDoItem.id
    );
    toDosStateObj.setToDosState(newToDosList);
    localStorage.setItem(
      enLocalStorageKeys.toDos,
      JSON.stringify(newToDosList)
    );
  }

  function confirmEditItemHandler(newTitle, newDescription) {
    let newToDosList = toDosStateObj.toDosState.map((item) => {
      if (item.id === toDoItem.id) {
        item.title = newTitle;
        item.description = newDescription;
      }

      return item;
    });
    toDosStateObj.setToDosState(newToDosList);
    localStorage.setItem(
      enLocalStorageKeys.toDos,
      JSON.stringify(newToDosList)
    );
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
            onClick={() => setOpenEditDialogState(true)}
          >
            <CreateIcon
              className="icon"
              style={{ color: "var(--mui-palette-secondary-main)" }}
            />
          </span>
          <span
            style={{ borderColor: "red" }}
            onClick={() => setOpenDeleteDialogState(true)}
          >
            <DeleteIcon className="icon" color="danger" />
          </span>
        </div>
      </div>

      {/* start delete dialog  */}
      <AlertDialog
        isOpen={openDeleteDialogState}
        dialogTitle="هل أنت متأكد من رغبتك فى حذف المهمة؟"
        dialogDescription="لا يمكنك التراجع عن الحذف فى حال اختيار زر حذف"
        agreeText="نعم قم بالحذف"
        disagreeText="إغلاق"
        setOpenDeleteDialogState={setOpenDeleteDialogState}
        deleteItemFromListHandler={deleteItemFromList}
      />
      {/* end delete dialog  */}

      {/* start edit dialog */}
      <EditToDoItemDialog
        isOpen={openEditDialogState}
        setOpenDialogStateHandler={setOpenEditDialogState}
        confirmEditHandler={confirmEditItemHandler}
        itemTitle={toDoItem.title}
        itemDescription={toDoItem.description}
      />
      {/* end edit dialog */}
    </>
  );
}
