import styles from "./Header.module.css";
import menuIconImage from "./../../../asserts/burger.svg";
import React from "react";
import { Button } from "common/components/Button/Button";
import { IconButton } from "common/components/Button/IconButton";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { logoutTC } from "../../../fuetures/auth/model/auth-reducer";
import { selectIsLoggedIn } from "../../../fuetures/auth/model/authSelectors";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className={styles.header}>
      <div className={styles.toolBar}>
        <IconButton iconUrl={menuIconImage} className={styles.burgerMenuImage} />
        <div className={styles.buttonContainer}>
          {isLoggedIn && <Button className={styles.button} onClick={() => {
            dispatch(logoutTC());
          }}>Logout
          </Button>}
          <Button className={styles.button}>Faq</Button>
        </div>
      </div>
    </div>
  );
};