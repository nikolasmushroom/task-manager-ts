import { _todolistAPI, TodolistType } from "../api/todolists-api";

import {
  setAppStatus,
  statusType
} from "../../../app/model/appSlice";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { AppThunk } from "../../../app/store";
import { ResultCode } from "../api/tasks-api";
import { getTasksTC } from "./tasksSlice";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = [];

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: statusType
}
export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  selectors : {
    selectTodolists : sliceState => sliceState
  },
  reducers: create => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }),
    addTodolist: create.reducer<{ todolist: TodolistDomainType }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    }),
    changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    }),
    changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].filter = action.payload.filter;
      }
    }),
    setTodolists: create.reducer<{ todolists: TodolistType[] }>((state, action) => {
      debugger
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }),
    setTodolistEntityStatus: create.reducer<{ id: string, status: statusType }>((state, action) => {
      const todolist = state.find(tl => tl.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.status;
      }
    }),
    clearTodolistsData: create.reducer((state, action) => {
      return [];
    })
  })
});

export const {selectTodolists} = todolistsSlice.selectors
export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  clearTodolistsData,
  setTodolists,
  setTodolistEntityStatus
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
export const getTodolistTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  _todolistAPI.getTodolists().then((response) => {
    dispatch(setTodolists({ todolists: response.data }));
    dispatch(setAppStatus({ status: "succeeded" }));
    return response.data;
  }).then((todolists) => {
    todolists.forEach(tl => {
      dispatch(getTasksTC(tl.id));
    });
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    });
};
export const addTodolistTC = (title: string): AppThunk<Promise<void>> => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  return _todolistAPI.createTodolist(title).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(addTodolist({ todolist: { ...response.data.data.item, filter: "all", entityStatus: "idle" } }));
      dispatch(setAppStatus({ status: "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    });
};
export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(setTodolistEntityStatus({ id: todolistId, status: "loading" }));
  _todolistAPI.deleteTodolist(todolistId).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTodolist({ id: todolistId }));
      dispatch(setAppStatus({ status: "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setTodolistEntityStatus({ id: todolistId, status: "failed" }));
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
      dispatch(setTodolistEntityStatus({ id: todolistId, status: "failed" }));
    })
  ;
};
export const updateTodolistTitleTC = (params: {
  id: string;
  title: string
}): AppThunk => (dispatch) => {
  const { id, title } = params;
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(setTodolistEntityStatus({ id, status: "loading" }));
  _todolistAPI.changeTodolistTitle({ id, title }).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(changeTodolistTitle({ id, title }));
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(setTodolistEntityStatus({ id, status: "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolist>
export type AddTodolistActionType = ReturnType<typeof addTodolist>
export type setTodolistsActionType = ReturnType<typeof setTodolists>

export type TodolistActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitle>
  | ReturnType<typeof changeTodolistFilter>
  | setTodolistsActionType
  | ReturnType<typeof setTodolistEntityStatus>
  | ReturnType<typeof clearTodolistsData>
