import { useContext, useEffect, useReducer, useState } from "react";
import AddItemForm from "../AddItemForm/AddItemForm";
import ListItem from "../ListItem/ListItem";
import MyMenu from "../Menu/MyMenu";
import { v4 as uuidv4 } from "uuid";
import { ToDoListContext } from "../../contexts/ToDoListContext";
import { enLocalStorageKeys } from "../../consts/LocalStorageKeys.enum";
import { enToDoFilter } from "../../contexts/ToDoFilter";
import AlertDialog from "../Dialogs/AlertDialog/AlertDialog";
import EditToDoItemDialog from "../Dialogs/EditToDoItemDialog/EditToDoItemDialog";
import "./ToDoList.css";
import { useToast } from "../../providers/ToastProvider";
import { ToDosReducer } from "../../reducers/ToDosReducer";
import {
  enToDoReducerActionType,
  enToDoReducerType,
} from "../../consts/ToDoReducerType";
import { useToDosReducerContext } from "../../providers/ToDosReducerProvider";

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
  let { toDos, dispatchToDosReducer } = useToDosReducerContext();
  let [filterToDosBy, setFilterToDosBy] = useState(enToDoFilter.All);
  let [openDeleteDialogState, setOpenDeleteDialogState] = useState({
    itemId: null,
    display: false,
  });
  let [openEditDialogState, setOpenEditDialogState] = useState({
    item: null,
    display: false,
  });

  //contexts
  let snackBarDisplayHandlerContext = useToast();

  //hooks
  useEffect(() => {
    dispatchToDosReducer({ type: enToDoReducerActionType.getAll });
  }, []);

  //handlers
  function filterToDoItemsHandler(filterBy) {
    setFilterToDosBy(filterBy);
  }

  function deleteItemFromList(itemId) {
    dispatchToDosReducer({
      type: enToDoReducerActionType.delete,
      payload: { id: itemId },
    });
    setOpenDeleteDialogState({ item: null, display: false });
    snackBarDisplayHandlerContext("تم حذف المهمة بنجاح");
  }

  function confirmEditItemHandler(itemId, newTitle, newDescription) {
    dispatchToDosReducer({
      type: enToDoReducerActionType.edit,
      payload: { id: itemId, newTitle, newDescription },
    });
    snackBarDisplayHandlerContext("تم تعديل المهمة بنجاح");
  }

  //Properties
  let filteredToDos = toDos;
  if (filterToDosBy === enToDoFilter.Completed) {
    filteredToDos = filteredToDos.filter((item) => item.isCompleted);
  } else if (filterToDosBy === enToDoFilter.NotCompleted) {
    filteredToDos = filteredToDos.filter((item) => !item.isCompleted);
  }

  let toDosList = filteredToDos?.map((item) => {
    return (
      <div className="mb-4">
        <ListItem
          key={item.id}
          toDoItem={item}
          setOpenDeleteDialogState={setOpenDeleteDialogState}
          setOpenEditDialogState={setOpenEditDialogState}
        />
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

        <div className="list-items">{toDosList}</div>


      <div className="mb-4 mt-4">
        <AddItemForm />
      </div>

      {/* start delete dialog  */}
      <AlertDialog
        isOpen={openDeleteDialogState.display}
        dialogTitle="هل أنت متأكد من رغبتك فى حذف المهمة؟"
        dialogDescription="لا يمكنك التراجع عن الحذف فى حال اختيار زر حذف"
        agreeText="نعم قم بالحذف"
        disagreeText="إغلاق"
        setOpenDeleteDialogState={setOpenDeleteDialogState}
        deleteItemFromListHandler={deleteItemFromList}
        itemId={openDeleteDialogState.itemId}
      />
      {/* end delete dialog  */}

      {/* start edit dialog */}
      <EditToDoItemDialog
        isOpen={openEditDialogState.display}
        setOpenDialogStateHandler={setOpenEditDialogState}
        confirmEditHandler={confirmEditItemHandler}
        item={openEditDialogState.item}
      />
      {/* end edit dialog */}
    </>
  );
}
