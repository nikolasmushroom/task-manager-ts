import { AddItemForm } from "common/components";
import React from "react";
import { addTodolistTC } from "../fuetures/todolists/model/todolists-reducer";
import { Todolists } from "../fuetures/todolists/Todolists/Todolists";
import { useAppDispatch, useAppSelector } from "common/hooks";
import styles from "./Main.module.css";
import { CustomSnackbar } from "common/components/CustomSnackbar/CustomSnackbar";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../fuetures/auth/model/authSelectors";
import { Path } from "common/router";

export const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const error = useSelector<RootState, string | null>(state => state.app.error);
  const isOpen = error !== null;
  const addTodolist = (title: string) => {
    const action = addTodolistTC(title);
    dispatch(action);
  };
  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />;
  }
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
      <CustomSnackbar callBack={() => {
      }} open={isOpen} autoHideDuration={6000} error={error} />
    </div>

  );
};
