import { EditableSpan } from "common/components";

import { useAppDispatch } from "common/hooks";
import deleteIcon from "../../../../../../asserts/delete.png";
import { IconButton } from "common/components/Button/IconButton";
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolists-api";
import { StatusType } from "../../../../../../app/model/appSlice";
import { TodolistDomainType } from "../../../../lib/types/types";
import { useTodolistTitle } from "../../../../lib/hooks/useTodolistTitle";

type TodolistTitle = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: TodolistTitle) => {
  const { updateTodolist, removeTodolistCallback } = useTodolistTitle(todolist);
  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan disabled={todolist.entityStatus === "loading"} value={todolist.title} onChange={updateTodolist} />
      </h3>
      <IconButton iconUrl={deleteIcon} onClick={removeTodolistCallback}
                  disabled={todolist.entityStatus === "loading"} />
    </div>
  );
};
