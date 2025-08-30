import { enToDoFilter } from "../../contexts/ToDoFilter";
import "./MyMenu.css";

export default function MyMenu({ filterBy, filterToDoItems }) {
  return (
    <>
      <ul className="menu" dir="rtl">
        <li
          className={filterBy === enToDoFilter.All ? "active" : ""}
          onClick={() => filterToDoItems(enToDoFilter.All)}
        >
          الكل
        </li>
        <li
          className={filterBy === enToDoFilter.Completed ? "active" : ""}
          onClick={() => filterToDoItems(enToDoFilter.Completed)}
        >
          منجز
        </li>
        <li
          className={filterBy === enToDoFilter.NotCompleted ? "active" : ""}
          onClick={() => filterToDoItems(enToDoFilter.NotCompleted)}
        >
          غير منجز
        </li>
      </ul>
    </>
  );
}
