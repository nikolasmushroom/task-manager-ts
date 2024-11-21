import { Task } from "./Task/Task";
import { useAppSelector } from "common/hooks";
import { TodolistDomainType } from "../../../model/todolists-reducer";
import { TaskStatus } from "../../../api";
import styles from './Task/Task.module.css'

type TasksPropsType = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: TasksPropsType) => {
  const tasks = useAppSelector((state) => state.tasks);
  const allTodolistTasks = tasks[todolist.id] || [];
  let tasksForTodolist = allTodolistTasks;


  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.notReady);
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.done);
  }
  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <div className={styles.taskContainer}>
          {tasksForTodolist.map((task) => (
            <Task key={task.id} task={task} todolistId={todolist.id} disabled={todolist.entityStatus === 'loading'}/>
          ))}
        </div>
      )}
    </>
  );
};
