import "./ListItem.css";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useToast } from "../../providers/ToastProvider";
import { useToDosReducerContext } from "../../providers/ToDosReducerProvider";
import { enToDoReducerActionType } from "../../consts/ToDoReducerType";

export default function ListItem({
  toDoItem,
  setOpenDeleteDialogState,
  setOpenEditDialogState,
}) {
  //context
  let snackBarDisplayHandlerContext = useToast();
  let { dispatchToDosReducer } = useToDosReducerContext();

  //functions
  function setIsCompletedHandler(isCompleted) {
    dispatchToDosReducer({
      type: enToDoReducerActionType.modifyState,
      payload: { isCompleted, id: toDoItem.id },
    });
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
