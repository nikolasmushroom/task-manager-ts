import { AddItemForm } from "common/components";
import React, { useEffect } from "react";
import { addTodolistTC } from "../fuetures/todolists/model/todolists-reducer";
import { Todolists } from "../fuetures/todolists/Todolists/Todolists";
import { useAppDispatch, useAppSelector } from "common/hooks";
import styles from "./Main.module.css";
import { selectAppError } from "./model/selectAppError";
import { useToast } from "common/components/Toast/ToastContainer";
import { setAppErrorAC } from "./model/app-reducer";


export const Main = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAppError);
  const toast = useToast();
  if (error) {
    toast.success(error,"left-bottom", () => dispatch(setAppErrorAC(null)));
  }

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
    </div>

  );
};
