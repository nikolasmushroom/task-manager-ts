
import { changeTodolistFilter, FilterValuesType, TodolistDomainType } from "../../../../../model/todolists-reducer";
import { useAppDispatch } from "common/hooks";
import { Button } from "common/components/Button/Button";
import styles from './FilterTasksButtons.module.css'
type FilterTasksButtonsPropsType = {
  todolist: TodolistDomainType;
};
export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsPropsType) => {
  const dispatch = useAppDispatch();
  const changeFilter = (filter: FilterValuesType, id: string) => {
    dispatch(changeTodolistFilter({ id, filter }));
  };
  return (
    <div>
      <Button className={`${styles.button} ${todolist.filter === 'all' ? styles.active : ''}`} onClick={() => changeFilter("all", todolist.id)}>
        All
      </Button>
      <Button
        className={`${styles.button} ${todolist.filter === 'active' ? styles.active : ''}`}
        onClick={() => changeFilter("active", todolist.id)}
      >
        Active
      </Button>
      <Button
        className={`${styles.button} ${todolist.filter === 'completed' ? styles.active : ''}`}
        onClick={() => changeFilter("completed", todolist.id)}
      >
        Completed
      </Button>
    </div>
  );
};
