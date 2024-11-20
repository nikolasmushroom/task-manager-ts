import { Todolist } from "./Todolist/Todolist";
import React, { useEffect } from "react";
import { useAppSelector } from "common/hooks";
import { useAppDispatch } from "common/hooks";
import { getTodolistTC } from "../model/todolists-reducer";
import styles from './Todolists.module.css'

export const Todolists = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector((state) => state.todolists);
  useEffect(() => {
    dispatch(getTodolistTC());
  }, []);
  return (
    <>
      {todolists.map((tl) => {
        return (
          <div key={tl.id}>
            <div className={styles.todolistItem}>
              <Todolist key={tl.id} todolist={tl} />
            </div>
          </div>
        );
      })}
    </>
  );
};
