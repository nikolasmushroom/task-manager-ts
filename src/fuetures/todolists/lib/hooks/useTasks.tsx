import { useState } from "react";
import { TaskStatus, useGetTasksQuery } from "../../api/tasks-api";
import { TodolistDomainType } from "../types/types";

export const useTasks = (todolist: TodolistDomainType) => {
  const [page, setPage] = useState(1);
  const { data} = useGetTasksQuery({
    todolistId: todolist.id,
    args: {page}
  });

  let tasks = data?.items || [];

  if (todolist.filter === "active") {
    tasks = tasks?.filter((task) => task.status === TaskStatus.notReady);
  }

  if (todolist.filter === "completed") {
    tasks = tasks?.filter((task) => task.status === TaskStatus.done);
  }
  return {data, setPage, page, tasks}
}