import {useAddItemForm} from "../../hooks";
import React from "react";
import { Button } from "common/components/Button/Button";

type PropsType = {
  addItem: (title: string) => void;
  disabled? :boolean
};

export const AddItemForm = ({ addItem, disabled = false }: PropsType) => {
  const { title, changeItemHandler, addItemOnKeyUpHandler, addItemHandler } = useAddItemForm(addItem);
  return (
    <div>
      <input
        placeholder="Enter a title"
        value={title}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        disabled={disabled}
      />
      <Button onClick={addItemHandler} disabled={disabled}>
        +
      </Button>
    </div>
  )
}