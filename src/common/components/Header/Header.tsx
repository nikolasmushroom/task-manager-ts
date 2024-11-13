import styles from './Header.module.css'
import menuIconImage from './../../../asserts/burger.svg'
import React from "react";
import { Button } from "common/components/Button/Button";

export const Header = () => {

  return (
    <div className={styles.header}>
      <div className={styles.toolBar}>
        <div className={styles.burgerMenu}>
          <img src={menuIconImage} alt="burger icon" className={styles.burgerMenuImage}/>
        </div>
        <div className={styles.buttonContainer}>
          <Button>Login</Button>
          <Button>Logout</Button>
          <Button>Faq</Button>
          <Button>Switch theme</Button>
        </div>
      </div>
    </div>
  )
}