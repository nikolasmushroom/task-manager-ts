import { TaskActionsTypes } from "../../model/tasks-reducer";
import { TodolistActionTypes } from "../../fuetures/todolists/model/todolists-reducer";
import { AuthActionTypes } from "../../fuetures/auth/model/auth-reducer";

export type statusType = "idle" | "loading" | "succeeded" | "failed"
export type errorType = string | null
export type initialStateType = typeof initialState
export type ThemeMode = "dark" | "light"
const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as statusType,
  error: null as errorType
};
export const appReducer = (state: initialStateType = initialState, action: AppActionTypes): initialStateType => {
  switch (action.type) {
    case "SET-APP-ERROR" :
      return { ...state, error: action.error };
    case "SET-STATUS" :
      return { ...state, status: action.status };
    case "CHANGE-THEME-MODE" :
      return { ...state, themeMode: action.themeMode };
    default:
      return state;
  }
};
export const changeThemeModeAC = (themeMode: ThemeMode) => {
  return {
    type: "CHANGE-THEME-MODE",
    themeMode: themeMode
  } as const;
};
export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET-APP-ERROR",
    error: error
  } as const;
};
export const setAppStatusAC = (status: statusType) => {
  return {
    type: "SET-STATUS",
    status: status
  } as const;
};

export type changeThemeModeActionType = ReturnType<typeof changeThemeModeAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionTypes =
  changeThemeModeActionType |
  setAppErrorActionType |
  setAppStatusActionType |
  TaskActionsTypes |
  TodolistActionTypes |
  AuthActionTypes
