import styles from "./Header.module.css";
import menuIconImage from "./../../../asserts/burger.svg";
import React from "react";
import { Button } from "common/components/Button/Button";
import { IconButton } from "common/components/Button/IconButton";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { selectIsLoggedIn, setIsLoggedIn } from "../../../app/model/appSlice";
import { useLogoutMutation } from "../../../fuetures/auth/api/auth-api";
import { baseApi } from "../../../app/model/base-api";
import { ResultCode } from "../../enums/resultCodeEnum";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [logout] = useLogoutMutation()
  return (
    <div className={styles.header}>
      <div className={styles.toolBar}>
        <IconButton iconUrl={menuIconImage} className={styles.burgerMenuImage} />
        <div className={styles.buttonContainer}>
          {isLoggedIn && <Button className={styles.button} onClick={() => {
            logout().then((result) => {
              if (result.data?.resultCode === ResultCode.Success) {
                localStorage.removeItem("sn-token");
              }
              dispatch(setIsLoggedIn({ isLoggedIn: false }));
            }).then(() => {
              baseApi.util.invalidateTags(['Todolist'])
              baseApi.util.invalidateTags(['Tasks'])
            })
          }}>Logout
          </Button>}
          <Button className={styles.button}>Faq</Button>
        </div>
      </div>
    </div>
  );
};