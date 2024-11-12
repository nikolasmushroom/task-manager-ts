import {useAddItemForm} from "../../hooks";
import React from "react";
import { Button } from "common/components/Button/Button";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: PropsType) => {
  const { title, error, changeItemHandler, addItemOnKeyUpHandler, addItemHandler } = useAddItemForm(addItem);
  return (
    <div>
      <input
        placeholder="Enter a title"
        value={title}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <Button onClick={addItemHandler}>
        +
      </Button>
    </div>
  )
}