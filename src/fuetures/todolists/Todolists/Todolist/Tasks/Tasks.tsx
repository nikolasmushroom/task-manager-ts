import { Task } from "./Task/Task";
import { useAppSelector } from "common/hooks";
import { TodolistDomainType } from "../../../../../model/todolists-reducer";
import { TaskStatus } from "../../../api";
import { useEffect } from "react";
import { useAppDispatch } from "common/hooks";
import { getTasksTC } from "../../../../../model/tasks-reducer";

type TasksPropsType = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: TasksPropsType) => {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const allTodolistTasks = tasks[todolist.id] || [];
  let tasksForTodolist = allTodolistTasks;
  useEffect(() => {
    dispatch(getTasksTC(todolist.id));
  }, []);

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
        <div>
          {tasksForTodolist.map((task) => (
            <Task task={task} todolistId={todolist.id} />
          ))}
        </div>
      )}
    </>
  );
};
