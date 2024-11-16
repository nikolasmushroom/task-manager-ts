import { todolistAPI, TodolistType } from "../api/todolists-api";

import {
  setAppStatusAC,
  statusType
} from "../../../app/app-reducer";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { AppThunk } from "../../../app/store";
import { ResultCode } from "../api/tasks-api";

const initialState: TodolistDomainType[] = [];

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: statusType
}
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      return [action.todolist, ...state];
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
    }
    case "SET-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) => tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl);
    }
    case "SET_TODOLISTS": {
      return action.todolists.map((t) => {
        return {
          ...t,
          filter: "all",
          entityStatus: "idle"
        };
      });
    }
    default:
      return state;
  }
};

// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const;
};

export const addTodolistAC = (todolist: TodolistDomainType) => {
  return { type: "ADD-TODOLIST", todolist } as const;
};

export const changeTodolistTitleAC = (payload: {
  id: string;
  title: string
}) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const;
};

export const changeTodolistFilter = (payload: {
  id: string;
  filter: FilterValuesType
}) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const;
};
export const setTodolists = (todolists: TodolistType[]) => {
  return { type: "SET_TODOLISTS", todolists: todolists } as const;
};
export const setTodolistEntityStatus = (payload: {
  id: string,
  status: statusType
}) => {
  return { type: "SET-TODOLIST-ENTITY-STATUS", payload } as const;
};
export const getTodolistTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.getTodolists().then((response) => {
    dispatch(setTodolists(response.data));
    dispatch(setAppStatusAC("succeeded"));
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.createTodolist(title).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(addTodolistAC({ ...response.data.data.item, filter: "all", entityStatus: "idle" }));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    });
};
export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(setTodolistEntityStatus({ id: todolistId, status: "loading" }));
  todolistAPI.deleteTodolist(todolistId).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setTodolistEntityStatus({ id: todolistId, status: "succeeded" }));
      dispatch(setAppStatusAC("succeeded"));
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
  dispatch(setAppStatusAC("loading"));
  dispatch(setTodolistEntityStatus({ id, status: "loading" }));
  todolistAPI.changeTodolistTitle({ id, title }).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(changeTodolistTitleAC({ id, title }));
      dispatch(setAppStatusAC("succeeded"));
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

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type setTodolistsActionType = ReturnType<typeof setTodolists>

export type TodolistActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilter>
  | setTodolistsActionType
  | ReturnType<typeof setTodolistEntityStatus>
