import { EditableSpan } from "common/components";
import {
  TodolistDomainType,
} from "../../../../model/todolistsSlice";
import { useAppDispatch } from "common/hooks";
import deleteIcon from "../../../../../../asserts/delete.png";
import { IconButton } from "common/components/Button/IconButton";
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolists-api";
import { StatusType } from "../../../../../../app/model/appSlice";

type TodolistTitle = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: TodolistTitle) => {
  const dispatch = useAppDispatch();
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();
  const updateQueryData = (status: StatusType) => {
    dispatch(todolistsApi.util.updateQueryData("getTodolists", undefined, state => {
      const index = state.findIndex(tl => tl.id === todolist.id);
      if (index !== -1) {
        state[index].entityStatus = status;
      }
    }));
  };
  const updateTodolist = (title: string) => {
    updateTodolistTitle({ title, id: todolist.id });
  };
  const removeTodolistCallback = () => {
    updateQueryData("loading");
    removeTodolist(todolist.id)
      .unwrap()
      .then((payload) => {
        if (payload.resultCode === 0) {
          updateQueryData("succeeded");
        } else {
          updateQueryData("failed");
        }
      })
      .catch((error) => {
        updateQueryData("failed");
      });
  };
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
