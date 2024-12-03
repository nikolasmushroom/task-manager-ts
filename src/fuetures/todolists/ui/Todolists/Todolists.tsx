import { Todolist } from "./Todolist/Todolist";
import React from "react";
import styles from './Todolists.module.css'
import { useGetTodolistsQuery } from "../../api/todolists-api";
import { TodolistSkeletons } from "../skeletons/TodolistSkeleton/TodolistSkeletons";

export const Todolists = () => {
  const { data: todolists = [], isLoading } = useGetTodolistsQuery()
  if (isLoading) {
    return (
      <TodolistSkeletons skeletonsCount={6}/>
    )
  }
  return (
    <>
      {todolists.map((tl) => {
        return (
            <div className={styles.todolist} key={tl.id}>
              <Todolist key={tl.id} todolist={tl} />
            </div>
        );
      })}
    </>
  );
};
