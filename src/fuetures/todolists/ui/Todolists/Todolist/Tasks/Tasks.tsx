import { Task } from "./Task/Task";
import styles from "./Task/Task.module.css";
import { TaskSkeleton } from "../../../skeletons/TaskSkeleton/TaskSkeleton";
import { usePagination } from "../../../../lib/hooks/usePagination";
import { TodolistDomainType } from "../../../../lib/types/types";
import { useTasks } from "../../../../lib/hooks/useTasks";


type TasksPropsType = {
  todolist: TodolistDomainType;
};

export const Tasks = ({ todolist }: TasksPropsType) => {
  const {data, tasks, setPage} = useTasks(todolist)
  const { paginationContainer } = usePagination({totalCount : data?.totalCount || 0, onChange : setPage})
  if (tasks) {
    return (
      <>
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <div className={styles.taskContainer}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} todolistId={todolist.id} disabled={todolist.entityStatus === "loading"} />
            ))}
            {paginationContainer}
          </div>
        )}
      </>
    );
  }
  return <TaskSkeleton />;
};
