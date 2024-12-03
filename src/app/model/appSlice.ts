import { createSlice, isPending } from "@reduxjs/toolkit";
import { todolistsApi } from "../../fuetures/todolists/api/todolists-api";
import { taskApi } from "../../fuetures/todolists/api/tasks-api";


export type StatusType = "idle" | "loading" | "succeeded" | "failed"
export type errorType = string | null
export type initialStateType = typeof initialState
export type ThemeMode = "dark" | "light"

const initialState = {
  isLoggedIn: false,
  themeMode: "light" as ThemeMode,
  status: "idle" as StatusType,
  error: null as errorType,
  captchaStatus: false,
  captchaUrl: ""
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectAppError: state => state.error,
    selectAppStatus: state => state.status,
    selectCaptchaUrl: state => state.captchaUrl,
    selectCaptchaStatus: state => state.captchaStatus
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppError: create.reducer<{ error: errorType }>((state, action) => {
      state.error = action.payload.error;
    }),
    setAppStatus: create.reducer<{ status: StatusType }>((state, action) => {
      state.status = action.payload.status;
    }),
    setCaptchaUrl: create.reducer<{ captchaUrl: string }>((state, action) => {
      state.captchaUrl = action.payload.captchaUrl;
    }),
    setCaptchaStatus: create.reducer<{status : boolean}>((state, action) => {
      state.captchaStatus = action.payload.status
    })
  }),
  extraReducers: builder => {
    builder
      .addMatcher(
        isPending, (state, action) => {
          if (
            todolistsApi.endpoints.getTodolists.matchPending(action) ||
            taskApi.endpoints.getTasks.matchPending(action)
          ) {
            return
          }
          state.status = "loading";
        }
      )
  }
});

export const {selectCaptchaStatus, selectCaptchaUrl, selectIsLoggedIn, selectAppError, selectAppStatus } = appSlice.selectors;
export const { setCaptchaUrl, changeThemeMode, setIsLoggedIn, setAppError, setAppStatus , setCaptchaStatus} = appSlice.actions;
export const appReducer = appSlice.reducer;




