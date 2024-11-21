import { AddItemForm } from "common/components";
import React from "react";
import { addTodolistTC } from "../fuetures/todolists/model/todolists-reducer";
import { Todolists } from "../fuetures/todolists/Todolists/Todolists";
import { useAppDispatch, useAppSelector } from "common/hooks";
import styles from "./Main.module.css";
import { ErrorToast } from "common/Toast/ErrorToast";
import { selectAppError } from "./model/selectAppError";

export const Main = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAppError);
  const addTodolist = (title: string) => {
    const action = addTodolistTC(title);
    dispatch(action);
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div>
          <AddItemForm addItem={addTodolist} />
        </div>
        <div className={styles.todolistContainer}>
          <Todolists />
        </div>
      </div>
      <ErrorToast dispatch={dispatch} error={error}/>
    </div>

  );
};
