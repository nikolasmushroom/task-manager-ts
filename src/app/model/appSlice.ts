import { TaskActionsTypes } from "../../fuetures/todolists/model/tasksSlice";
import { TodolistActionTypes } from "../../fuetures/todolists/model/todolistsSlice";
import { createSlice } from "@reduxjs/toolkit";


export type statusType = "idle" | "loading" | "succeeded" | "failed"
export type errorType = string | null
export type initialStateType = typeof initialState
export type ThemeMode = "dark" | "light"

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as statusType,
  error: null as errorType
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  selectors: {
    selectAppError : state => state.error,
    selectAppStatus : state => state.status
  },
  reducers: create => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppError: create.reducer<{ error: errorType }>((state, action) => {
      state.error = action.payload.error;
    }),
    setAppStatus: create.reducer<{ status: statusType }>((state, action) => {
      state.status = action.payload.status;
    })
  }),
});

export const {selectAppError, selectAppStatus} = appSlice.selectors
export const { changeThemeMode, setAppError, setAppStatus } = appSlice.actions;
export const appReducer =  appSlice.reducer;


export type changeThemeModeActionType = ReturnType<typeof changeThemeMode>
export type setAppErrorActionType = ReturnType<typeof setAppError>
export type setAppStatusActionType = ReturnType<typeof setAppStatus>

export type AppActionTypes =
  changeThemeModeActionType |
  setAppErrorActionType |
  setAppStatusActionType |
  TaskActionsTypes |
  TodolistActionTypes
