import { useAppDispatch } from "common/hooks";
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../api/todolists-api";
import { StatusType } from "../../../../app/model/appSlice";
import { TodolistDomainType } from "../types/types";

export const useTodolistTitle = (todolist : TodolistDomainType) => {
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
  return {removeTodolistCallback, updateTodolist}
}