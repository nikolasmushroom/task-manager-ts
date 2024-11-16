import {useAddItemForm} from "../../hooks";
import React from "react";
import addIcon from './../../../asserts/addItem.png'
import { TextInput } from "common/components/Input/TextInput";
import styles from "./AddItemForm.module.css";
import { IconButton } from "common/components/Button/IconButton";

type PropsType = {
  addItem: (title: string) => void;
  disabled? :boolean
  buttonText? : string
};

export const AddItemForm = ({ addItem, buttonText = '+',  disabled = false }: PropsType) => {
  const { title, error, changeItemHandler, addItemOnKeyUpHandler, addItemHandler } = useAddItemForm(addItem);
  return (
    <div className={styles.addItemFormContainer}>
      <TextInput
        placeholder="Enter a title"
        value={title}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        disabled={disabled}
      />
      <IconButton iconUrl={addIcon} onClick={addItemHandler} disabled={disabled}/>
    </div>
  )
}