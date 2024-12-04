import { AddItemForm } from "common/components";
import { Todolists } from "../fuetures/todolists/ui/Todolists/Todolists";
import styles from "./Main.module.css";
import { useAddTodolistMutation } from "../fuetures/todolists/api/todolists-api";


export const Main = () => {

  const [addTodolist] = useAddTodolistMutation();


  const addTodolistCallback = (title: string) => {
    addTodolist(title);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>
          <AddItemForm addItem={addTodolistCallback} />
        </div>
        <div className={styles.todolistContainer}>
          <Todolists />
        </div>
      </div>
    </div>

  );
};
