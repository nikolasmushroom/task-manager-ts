import { todolistAPI, TodolistType } from "../api/todolists-api";

import {
  setAppStatusAC,
  statusType
} from "../../../app/model/app-reducer";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { AppThunk } from "../../../app/store";
import { ResultCode } from "../api/tasks-api";
import { getTasksTC, setTasks } from "../../../model/tasks-reducer";

const initialState: TodolistDomainType[] = [];

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: statusType
}
export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
  switch (action.type) {
    case "TODOLISTS/REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "TODOLISTS/ADD-TODOLIST": {
      return [action.todolist, ...state];
    }

    case "TODOLISTS/CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl));
    }

    case "TODOLISTS/CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl));
    }
    case "TODOLISTS/SET-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) => tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl);
    }
    case "TODOLISTS/SET_TODOLISTS": {
      return action.todolists.map((t) => {
        return {
          ...t,
          filter: "all",
          entityStatus: "idle"
        };
      });
    }
    case "TODOLISTS/CLEAR_TODOLISTS_DATA":
      return [...action.todolists];
    default:
      return state;
  }
};

// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return { type: "TODOLISTS/REMOVE-TODOLIST", payload: { id: todolistId } } as const;
};

export const addTodolistAC = (todolist: TodolistDomainType) => {
  return { type: "TODOLISTS/ADD-TODOLIST", todolist } as const;
};

export const changeTodolistTitleAC = (payload: {
  id: string;
  title: string
}) => {
  return { type: "TODOLISTS/CHANGE-TODOLIST-TITLE", payload } as const;
};

export const changeTodolistFilter = (payload: {
  id: string;
  filter: FilterValuesType
}) => {
  return { type: "TODOLISTS/CHANGE-TODOLIST-FILTER", payload } as const;
};
export const setTodolists = (todolists: TodolistType[]) => {
  return { type: "TODOLISTS/SET_TODOLISTS", todolists: todolists } as const;
};
export const setTodolistEntityStatus = (payload: {
  id: string,
  status: statusType
}) => {
  return { type: "TODOLISTS/SET-TODOLIST-ENTITY-STATUS", payload } as const;
};
export const clearTodolistsData = () => {
  return {
    type: "TODOLISTS/CLEAR_TODOLISTS_DATA",
    todolists: []
  } as const;
};
export const getTodolistTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI.getTodolists().then((response) => {
    dispatch(setTodolists(response.data));
    dispatch(setAppStatusAC("succeeded"));
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
  | ReturnType<typeof clearTodolistsData>
